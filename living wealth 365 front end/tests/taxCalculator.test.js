import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePersonalTax, TAX_BRACKETS } from '../src/utils/taxCalculator.js';

test('Tax calculation for income within 0% tax-free threshold (<= 310,000 THB/year)', () => {
  // Monthly salary 25,000 THB * 12 = 300,000 THB
  // Expenses 50% max 100,000 -> 100,000
  // Personal deduction -> 60,000
  // Net Taxable = 300,000 - 100,000 - 60,000 = 140,000 THB (<= 150,000 THB)
  const result = calculatePersonalTax({ monthlySalary: 25000 });

  assert.equal(result.annualIncome, 300000);
  assert.equal(result.expenses, 100000);
  assert.equal(result.personalDeduction, 60000);
  assert.equal(result.netTaxableIncome, 140000);
  assert.equal(result.taxPayable, 0);
  assert.equal(result.marginalTaxRate, 0);
  assert.equal(result.effectiveTaxRate, 0);
});

test('Tax calculation across progressive brackets (5% and 10%)', () => {
  // Monthly salary 50,000 THB * 12 = 600,000 THB
  // Expenses = 100,000 THB
  // Personal deduction = 60,000 THB
  // Social security = 9,000 THB
  // Net Taxable = 600,000 - 100,000 - 60,000 - 9,000 = 431,000 THB
  // Bracket 0-150,000 (150,000) @ 0% = 0
  // Bracket 150,001-300,000 (150,000) @ 5% = 7,500
  // Bracket 300,001-431,000 (131,000) @ 10% = 13,100
  // Total Tax = 7,500 + 13,100 = 20,600 THB
  const result = calculatePersonalTax({
    monthlySalary: 50000,
    socialSecurity: 9000,
  });

  assert.equal(result.annualIncome, 600000);
  assert.equal(result.expenses, 100000);
  assert.equal(result.totalDeductions, 69000); // 60,000 + 9,000
  assert.equal(result.netTaxableIncome, 431000);
  assert.equal(result.taxPayable, 20600);
  assert.equal(result.marginalTaxRate, 10);
});

test('Insurance tax deduction reduces net tax and computes potential savings', () => {
  // Salary 80,000 THB/mo * 12 = 960,000 THB
  // Base calculation without life insurance
  const baseResult = calculatePersonalTax({
    monthlySalary: 80000,
    socialSecurity: 9000,
    lifeInsurance: 0,
  });

  // Calculation with 100,000 THB life insurance deduction
  const withInsuranceResult = calculatePersonalTax({
    monthlySalary: 80000,
    socialSecurity: 9000,
    lifeInsurance: 100000,
  });

  // Net taxable should be reduced by exactly 100,000 THB
  assert.equal(baseResult.netTaxableIncome - withInsuranceResult.netTaxableIncome, 100000);
  // Tax savings should be positive
  assert.ok(baseResult.taxPayable > withInsuranceResult.taxPayable);

  // Remaining room should be 0 when 100,000 is used
  assert.equal(withInsuranceResult.taxSavingsOpportunity.lifeInsuranceRoom, 0);
});

test('Zero and negative inputs are safely handled', () => {
  const result = calculatePersonalTax({ monthlySalary: -5000, bonus: 0 });
  assert.equal(result.annualIncome, 0);
  assert.equal(result.taxPayable, 0);
  assert.equal(result.effectiveTaxRate, 0);
});
