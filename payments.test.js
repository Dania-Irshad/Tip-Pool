describe("Payments test (with setup and tear-down)", function () {
    beforeEach(function () {
        billAmtInput.value = 300;
        tipAmtInput.value = 50;
        calculateTipPercent(300, 50);
    });

    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment' + paymentId].billAmt).toEqual('300');
        expect(allPayments['payment' + paymentId].tipAmt).toEqual('50');
        expect(allPayments['payment' + paymentId].tipPercent).toEqual(17);
    });

    it('should create no new payment on createCurPayment() if there is no input', function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should create new payment on createCurPayment()', function () {
        expect(createCurPayment()).toEqual({
            billAmt: '300', tipAmt: '50',
            tipPercent: calculateTipPercent(300, 50)
        });
    });

    it('should and append payment table on appendPaymentTable(curPayment)', function () {
        submitPaymentInfo();
        let tdList = document.querySelectorAll('#paymentTable tbody tr td');
        expect(tdList.length).toEqual(4);
        expect(tdList[0].innerText).toEqual('$300');
        expect(tdList[1].innerText).toEqual('$50');
        expect(tdList[2].innerText).toEqual('17%');
        expect(tdList[3].lastElementChild.innerText).toEqual('X');
    });

    it('should update summary table on updateSummary()', function () {
        submitPaymentInfo();
        updateSummary();
        expect(summaryTds.length).toEqual(3);
        expect(summaryTds[0].innerText).toEqual('$300');
        expect(summaryTds[1].innerText).toEqual('$50');
        expect(summaryTds[2].innerText).toEqual('17%');
    });

    afterEach(function () {
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerHTML = '';
        billAmtInput.value = '';
        tipAmtInput.value = '';
        for (tds of summaryTds) {
            tds.innerHTML = '';
        }
    });

});