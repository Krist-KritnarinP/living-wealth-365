/**
 * 🧮 Personal Income Tax Calculation Engine (ภาษีเงินได้บุคคลธรรมดา ภ.ง.ด. 90/91)
 * According to Thai Revenue Department (กรมสรรพากร) standard rules.
 */

// อัตราภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได
export const TAX_BRACKETS = [
  { min: 0, max: 150000, rate: 0, title: '0 - 150,000 บาท', rateLabel: '0% (ยกเว้น)' },
  { min: 150000, max: 300000, rate: 0.05, title: '150,001 - 300,000 บาท', rateLabel: '5%' },
  { min: 300000, max: 500000, rate: 0.10, title: '300,001 - 500,000 บาท', rateLabel: '10%' },
  { min: 500000, max: 750000, rate: 0.15, title: '500,001 - 750,000 บาท', rateLabel: '15%' },
  { min: 750000, max: 1000000, rate: 0.20, title: '750,001 - 1,000,000 บาท', rateLabel: '20%' },
  { min: 1000000, max: 2000000, rate: 0.25, title: '1,000,001 - 2,000,000 บาท', rateLabel: '25%' },
  { min: 2000000, max: 5000000, rate: 0.30, title: '2,000,001 - 5,000,000 บาท', rateLabel: '30%' },
  { min: 5000000, max: Infinity, rate: 0.35, title: 'มากกว่า 5,000,000 บาท', rateLabel: '35%' },
];

/**
 * คำนวณภาษีเงินได้บุคคลธรรมดา
 * @param {Object} params
 * @returns {Object} ผลลัพธ์การคำนวณและคำแนะนำการลดหย่อน
 */
export function calculatePersonalTax(params = {}) {
  // 1. รายได้รวมทั้งปี
  const monthlySalary = Math.max(0, parseFloat(params.monthlySalary) || 0);
  const bonus = Math.max(0, parseFloat(params.bonus) || 0);
  const otherIncome = Math.max(0, parseFloat(params.otherIncome) || 0);
  const annualIncome = (monthlySalary * 12) + bonus + otherIncome;

  if (annualIncome <= 0) {
    return {
      annualIncome: 0,
      expenses: 0,
      totalDeductions: 0,
      netTaxableIncome: 0,
      taxPayable: 0,
      effectiveTaxRate: 0,
      marginalTaxRate: 0,
      bracketBreakdown: [],
      taxSavingsOpportunity: {
        lifeInsuranceRoom: 100000,
        annuityRoom: 0,
        potentialSavings: 0,
      },
    };
  }

  // 2. หักค่าใช้จ่ายตามกฎหมาย (50% ของเงินได้ แต่ไม่เกิน 100,000 บาท)
  const expenses = Math.min(100000, annualIncome * 0.5);

  // 3. ค่าลดหย่อนส่วนตัว & ครอบครัว
  const personalDeduction = 60000; // ค่าลดหย่อนผู้มีเงินได้ 60,000 บาท
  const hasSpouse = Boolean(params.hasSpouse);
  const spouseDeduction = hasSpouse ? 60000 : 0; // คู่สมรสไม่มีเงินได้ 60,000 บาท

  const childrenCount = Math.max(0, parseInt(params.childrenCount, 10) || 0);
  const childrenDeduction = childrenCount * 30000; // คนละ 30,000 บาท

  const parentsCount = Math.min(4, Math.max(0, parseInt(params.parentsCount, 10) || 0));
  const parentsDeduction = parentsCount * 30000; // บิดามารดา คนละ 30,000 บาท (สูงสุด 4 คน)

  // 4. ค่าลดหย่อนประกันและการออม
  const socialSecurity = Math.min(9000, Math.max(0, parseFloat(params.socialSecurity) || 0)); // สูงสุด 9,000

  // ประกันชีวิตและประกันสุขภาพทั่วไป (รวมกันสูงสุดไม่เกิน 100,000 บาท)
  const lifeInsurance = Math.min(100000, Math.max(0, parseFloat(params.lifeInsurance) || 0));

  // ประกันบำนาญ (สูงสุด 15% ของเงินได้ แต่ไม่เกิน 200,000 บาท)
  const maxAnnuityAllowed = Math.min(200000, annualIncome * 0.15);
  const annuityInsurance = Math.min(maxAnnuityAllowed, Math.max(0, parseFloat(params.annuityInsurance) || 0));

  // กองทุนสำรองเลี้ยงชีพ / กบข. / RMF / SSF / Thai ESG (รวมกันตามสิทธิ)
  const maxFundsAllowed = Math.min(500000, annualIncome * 0.3);
  const providentFundAndRmf = Math.min(maxFundsAllowed, Math.max(0, parseFloat(params.providentFundAndRmf) || 0));

  // ดอกเบี้ยเงินกู้ยืมเพื่อซื้อที่อยู่อาศัย (สูงสุด 100,000 บาท)
  const homeLoanInterest = Math.min(100000, Math.max(0, parseFloat(params.homeLoanInterest) || 0));

  // รวมค่าลดหย่อนทั้งหมด
  const totalDeductions =
    personalDeduction +
    spouseDeduction +
    childrenDeduction +
    parentsDeduction +
    socialSecurity +
    lifeInsurance +
    annuityInsurance +
    providentFundAndRmf +
    homeLoanInterest;

  // 5. เงินได้สุทธิ (Net Taxable Income)
  const netTaxableIncome = Math.max(0, annualIncome - expenses - totalDeductions);

  // 6. คำนวณภาษีแบบขั้นบันได (Progressive Tax Brackets)
  let taxPayable = 0;
  let marginalTaxRate = 0;
  const bracketBreakdown = [];

  for (const bracket of TAX_BRACKETS) {
    if (netTaxableIncome > bracket.min) {
      const taxableAmountInBracket = Math.min(
        netTaxableIncome - bracket.min,
        bracket.max - bracket.min
      );
      const taxInBracket = taxableAmountInBracket * bracket.rate;
      taxPayable += taxInBracket;

      if (taxInBracket > 0 || (bracket.rate === 0 && taxableAmountInBracket > 0)) {
        marginalTaxRate = bracket.rate;
      }

      bracketBreakdown.push({
        title: bracket.title,
        rate: bracket.rate,
        rateLabel: bracket.rateLabel,
        taxableAmount: taxableAmountInBracket,
        taxInBracket,
        isActive: true,
      });
    } else {
      bracketBreakdown.push({
        title: bracket.title,
        rate: bracket.rate,
        rateLabel: bracket.rateLabel,
        taxableAmount: 0,
        taxInBracket: 0,
        isActive: false,
      });
    }
  }

  // 7. สัดส่วนภาษีที่แท้จริง (Effective Tax Rate)
  const effectiveTaxRate = annualIncome > 0 ? (taxPayable / annualIncome) * 100 : 0;

  // 8. โอกาสประหยัดภาษีเพิ่มจาก Living Wealth 365 (Tax Savings Opportunity)
  const lifeInsuranceRoom = Math.max(0, 100000 - lifeInsurance);
  const annuityRoom = Math.max(0, maxAnnuityAllowed - annuityInsurance);
  const totalInsuranceRoom = lifeInsuranceRoom + annuityRoom;

  // คำนวณเงินภาษีที่จะประหยัดได้หากใช้สิทธิประกันเต็ม
  const potentialSavings = totalInsuranceRoom * marginalTaxRate;

  return {
    annualIncome,
    expenses,
    personalDeduction,
    spouseDeduction,
    childrenDeduction,
    parentsDeduction,
    socialSecurity,
    lifeInsurance,
    annuityInsurance,
    providentFundAndRmf,
    homeLoanInterest,
    totalDeductions,
    netTaxableIncome,
    taxPayable,
    effectiveTaxRate: parseFloat(effectiveTaxRate.toFixed(2)),
    marginalTaxRate: Math.round(marginalTaxRate * 100),
    bracketBreakdown,
    taxSavingsOpportunity: {
      lifeInsuranceRoom,
      annuityRoom,
      totalInsuranceRoom,
      potentialSavings,
      marginalTaxRate: Math.round(marginalTaxRate * 100),
    },
  };
}
