/**
 * MAQUI VENTAS - Industrial Equipment Leasing & Proforma Quote Simulator
 * Caterpillar Financial Standard Amortization & B2B Commercial Quotes
 */

function calculateLeasingTerms({ price, downPercent = 0.20, termMonths = 36, rateEA = 0.089, residualPercent = 0.01 }) {
    const downPayment = Math.round(price * downPercent);
    const financedAmount = price - downPayment;
    
    // Tasa mensual efectiva a partir de EA: (1 + EA)^(1/12) - 1
    const monthlyRate = Math.pow(1 + rateEA, 1 / 12) - 1;
    
    // Cuota mensual de Leasing con valor residual al final
    // PMT = [FinancedAmount - Residual / (1+r)^n] * [r / (1 - (1+r)^(-n))]
    const residualValue = Math.round(price * residualPercent);
    const pvResidual = residualValue / Math.pow(1 + monthlyRate, termMonths);
    const principalToAmortize = financedAmount - pvResidual;
    
    const monthlyPayment = Math.round(
        principalToAmortize * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
        (Math.pow(1 + monthlyRate, termMonths) - 1)
    );
    
    const totalPayments = (monthlyPayment * termMonths) + downPayment + residualValue;
    const totalFinancialCost = totalPayments - price;
    
    return {
        price,
        downPercent,
        downPayment,
        financedAmount,
        termMonths,
        rateEA,
        monthlyRate,
        monthlyPayment,
        residualValue,
        totalPayments,
        totalFinancialCost
    };
}

function generateProformaQuoteNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `COT-${year}-${rand}`;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateLeasingTerms, generateProformaQuoteNumber };
}
