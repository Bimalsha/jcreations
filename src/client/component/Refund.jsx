import React from 'react';

function Refund() {
    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-lg">
                <div className="py-8 px-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Refund Policy</h1>

                    <p className="text-gray-700 mb-8">
                        Thank you for shopping at Jcreations. We value your satisfaction and strive to provide
                        you with the best online shopping experience possible. If, for any reason, you are not
                        completely satisfied with your purchase, we are here to help.
                    </p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Returns</h2>
                            <p className="text-gray-700">
                                We accept returns within 7 days from the date of purchase. To be eligible for a return,
                                your item must be unused and in the same condition that you received it. It must also be
                                in the original packaging.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Refunds</h2>
                            <p className="text-gray-700">
                                Once we receive your return and inspect the item, we will notify you of the status of your refund.
                                If your return is approved, we will initiate a refund to your original method of payment.
                                Please note that the refund amount will exclude any shipping charges incurred during the initial purchase.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Exchanges</h2>
                            <p className="text-gray-700">
                                If you would like to exchange your item for a different size, color, or style, please contact
                                our customer support team within 7 days of receiving your order. We will provide you with
                                further instructions on how to proceed with the exchange.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Non-Returnable Items</h2>
                            <p className="text-gray-700 mb-2">
                                Certain items are non-returnable and non-refundable. These include:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                <li>Gift cards</li>
                                <li>Downloadable software products</li>
                                <li>Personalized or custom-made items</li>
                                <li>Perishable goods</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Damaged or Defective Items</h2>
                            <p className="text-gray-700">
                                In the unfortunate event that your item arrives damaged or defective, please contact us immediately.
                                We will arrange for a replacement or issue a refund, depending on your preference and product availability.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Return Shipping</h2>
                            <p className="text-gray-700">
                                You will be responsible for paying the shipping costs for returning your item unless the return is
                                due to our error (e.g., wrong item shipped, defective product). In such cases, we will provide you
                                with a prepaid shipping label.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Processing Time</h2>
                            <p className="text-gray-700">
                                Refunds and exchanges will be processed within 7 business days after we receive your returned item.
                                Please note that it may take additional time for the refund to appear in your account, depending on
                                your payment provider.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
                            <p className="text-gray-700">
                                If you have any questions or concerns regarding our refund policy, please contact our customer
                                support team. We are here to assist you and ensure your shopping experience with us is enjoyable
                                and hassle-free.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Refund;