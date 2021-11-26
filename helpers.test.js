describe("Helpers test (with setup and tear-down)", function() {
    beforeEach(function(){
        billAmtInput.value = '300';
        tipAmtInput.value = '50';
        calculateTipPercent(300, 50);
        submitPaymentInfo();
    });

    it('should calculate tip percent on calculateTipPercent(billAmt, tipAmt)', function(){
        expect(calculateTipPercent(300, 50)).toEqual(17);
    });

    it('should sum up the total on sumPaymentTotal(type)', function(){
        expect(sumPaymentTotal('tipAmt')).toEqual(50);
        expect(sumPaymentTotal('billAmt')).toEqual(300);
        expect(sumPaymentTotal('tipPercent')).toEqual(17);

    });

    it('should create new td and delete button and append to tr', function(){
        let tdList = document.querySelectorAll('#paymentTable tbody tr td');
        expect(tdList.length).toEqual(4);
        expect(tdList[0].innerText).toEqual('$300');
        expect(tdList[1].innerText).toEqual('$50');
        expect(tdList[2].innerText).toEqual('17%');
        expect(tdList[3].lastElementChild.innerText).toEqual('X');
    });


});

afterEach(function(){
    allPayments = {};
    paymentId = 0;
    paymentTbody.innerHTML = '';
    billAmtInput.value = '';
    tipAmtInput.value = '';
    for (tds of summaryTds)
    {
        tds.innerHTML = '';
    }
});