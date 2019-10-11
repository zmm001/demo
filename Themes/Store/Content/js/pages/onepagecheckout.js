$(function () {
    var coBillingForm = $("#co-billing-form");
    Billing.init('#co-billing-form', coBillingForm.data("url"),
        coBillingForm.data("step"));
    if ($("#billing-address-select").length > 0) {
        Billing.newAddress(!$('#billing-address-select').val());
    }
    //货运地址
    var coShippingForm = $("#co-shipping-form");
    if (coShippingForm.length > 0) {
        Shipping.init('#co-shipping-form', coShippingForm.data("url"));
        if ($("#shipping-address-select").length > 0) {
            Shipping.newAddress(!$('#shipping-address-select').val());
        }   
    }

    //货运方式
    var coShippingMethodForm = $("#co-shipping-method-form");
    if (coShippingMethodForm.length > 0) {
        ShippingMethod.init('#co-shipping-method-form', coShippingMethodForm.data("url"));
    }
    //付款方式
    var coPaymentMethodForm = $("#co-payment-method-form");
    PaymentMethod.init('#co-payment-method-form', coPaymentMethodForm.data("url"));
    //付款信息
    var coPaymentInfoForm = $("#co-payment-info-form");
    PaymentInfo.init('#co-payment-info-form', coPaymentInfoForm.data("url"));
    //完成
    var checkoutSteopConfirmOrder = $("#checkout-step-confirm-order");
    ConfirmOrder.init(checkoutSteopConfirmOrder.data("url1"), checkoutSteopConfirmOrder.data("url2"));

    //初始化 accordion
    Accordion.init('accordion', '.panel-heading', true);
    Accordion.openSection('#opc-billing');
    var cart = $("#cart");
    Checkout.init(cart.data("url"));
    if (Billing.disableBillingAddressCheckoutStep) {
        Accordion.hideSection('#opc-billing');
        Billing.save();
    }
});