
        document.addEventListener('DOMContentLoaded', function() {
            // Variables
            const form = document.getElementById('bookingForm');
            const formSteps = form.querySelectorAll('.form-step');
            const stepIndicators = document.querySelectorAll('.step-indicator');
            let currentStep = 1;
            let promoApplied = false;
            let promoDiscount = 0;
            let selectedWorkers = [];
            
            // Service rates
            const serviceRates = {
                construction: 25,
                moving: 22,
                landscaping: 20,
                cleaning: 18,
                event: 19,
                handyman: 23
            };
            
            // Valid promo codes
            const promoCodes = {
                'WELCOME10': 10,
                'SPRING25': 25,
                'NEWUSER': 20
            };
            
            // Initialize
            updateSummary();
            updatePricing();
            
            // Navigation buttons
            document.getElementById('step1Next').addEventListener('click', () => {
                if (validateStep1()) {
                    goToStep(2);
                }
            });
            
            document.getElementById('step2Prev').addEventListener('click', () => {
                goToStep(1);
            });
            
            document.getElementById('step2Next').addEventListener('click', () => {
                if (validateStep2()) {
                    goToStep(3);
                }
            });
            
            document.getElementById('step3Prev').addEventListener('click', () => {
                goToStep(2);
            });
            
            document.getElementById('step3Next').addEventListener('click', () => {
                if (validateStep3()) {
                    updateSummary();
                    updatePricing();
                    goToStep(4);
                }
            });
            
            document.getElementById('step4Prev').addEventListener('click', () => {
                goToStep(3);
            });
            
            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateStep4()) {
                    // Simulate form submission
                    alert('Booking successful! A confirmation will be sent to your email.');
                    // In a real application, you would send the data to the server here
                }
            });
            
            // Promo code application
            document.getElementById('applyPromo').addEventListener('click', applyPromoCode);
            
            // Worker selection
            const workerCheckboxes = document.querySelectorAll('.worker-checkbox');
            workerCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        selectedWorkers.push(this.value);
                    } else {
                        const index = selectedWorkers.indexOf(this.value);
                        if (index > -1) {
                            selectedWorkers.splice(index, 1);
                        }
                    }
                });
            });
            
            // Payment method selection
            const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
            paymentMethods.forEach(method => {
                method.addEventListener('change', function() {
                    if (this.value === 'creditCard') {
                        document.getElementById('creditCardForm').style.display = 'block';
                    } else {
                        document.getElementById('creditCardForm').style.display = 'none';
                    }
                });
            });
            
            // Update form values when changed
            document.getElementById('serviceType').addEventListener('change', updateSummary);
            document.getElementById('numWorkers').addEventListener('change', function() {
                updateSummary();
                updatePricing();
            });
            document.getElementById('bookingDate').addEventListener('change', updateSummary);
            document.getElementById('bookingTime').addEventListener('change', updateSummary);
            document.getElementById('address').addEventListener('change', updateSummary);
            document.getElementById('city').addEventListener('change', updateSummary);
            document.getElementById('zipCode').addEventListener('change', updateSummary);
            
            // Functions
            function goToStep(step) {
                // Update current step
                currentStep = step;
                
                // Hide all steps
                formSteps.forEach(stepEl => {
                    stepEl.classList.remove('active');
                });
                
                // Show current step
                formSteps[step - 1].classList.add('active');
                
                // Update progress indicators
                stepIndicators.forEach(indicator => {
                    const indicatorStep = parseInt(indicator.dataset.step);
                    indicator.classList.remove('active', 'completed');
                    
                    if (indicatorStep === currentStep) {
                        indicator.classList.add('active');
                    } else if (indicatorStep < currentStep) {
                        indicator.classList.add('completed');
                    }
                });
                
                // Scroll to top
                window.scrollTo(0, 0);
            }
            
            function validateStep1() {
                let isValid = true;
                
                // Service Type validation
                const serviceType = document.getElementById('serviceType');
                if (!serviceType.value) {
                    showError(serviceType, 'serviceType-error', 'Please select a service');
                    isValid = false;
                } else {
                    hideError(serviceType, 'serviceType-error');
                }
                
                // Date validation
                const bookingDate = document.getElementById('bookingDate');
                if (!bookingDate.value) {
                    showError(bookingDate, 'bookingDate-error', 'Please select a date');
                    isValid = false;
                } else {
                    // Check if date is in the future
                    const selectedDate = new Date(bookingDate.value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (selectedDate < today) {
                        showError(bookingDate, 'bookingDate-error', 'Please select a future date');
                        isValid = false;
                    } else {
                        hideError(bookingDate, 'bookingDate-error');
                    }
                }
                
                // Time validation
                const bookingTime = document.getElementById('bookingTime');
                if (!bookingTime.value) {
                    showError(bookingTime, 'bookingTime-error', 'Please select a time');
                    isValid = false;
                } else {
                    hideError(bookingTime, 'bookingTime-error');
                }
                
                return isValid;
            }
            
            function validateStep2() {
                let isValid = true;
                
                // Address validation
                const address = document.getElementById('address');
                if (!address.value.trim()) {
                    showError(address, 'address-error', 'Please enter your address');
                    isValid = false;
                } else {
                    hideError(address, 'address-error');
                }
                
                // City validation
                const city = document.getElementById('city');
                if (!city.value.trim()) {
                    showError(city, 'city-error', 'Please enter your city');
                    isValid = false;
                } else {
                    hideError(city, 'city-error');
                }
                
                // ZIP Code validation
                const zipCode = document.getElementById('zipCode');
                const zipRegex = /^\d{5,6}$/;
                
                if (!zipCode.value.trim()) {
                    showError(zipCode, 'zipCode-error', 'Please enter your PIN code');
                    isValid = false;
                } else if (!zipRegex.test(zipCode.value.trim())) {
                    showError(zipCode, 'zipCode-error', 'Please enter a valid PIN code (5-6 digits)');
                    isValid = false;
                } else {
                    hideError(zipCode, 'zipCode-error');
                }
                
                // Job Description validation
                const jobDescription = document.getElementById('jobDescription');
                if (!jobDescription.value.trim()) {
                    showError(jobDescription, 'jobDescription-error', 'Please provide a job description');
                    isValid = false;
                } else if (jobDescription.value.trim().length < 10) {
                    showError(jobDescription, 'jobDescription-error', 'Please provide a more detailed description');
                    isValid = false;
                } else {
                    hideError(jobDescription, 'jobDescription-error');
                }
                
                return isValid;
            }
            
            function validateStep3() {
                let isValid = true;
                
                // Check if at least one worker is selected
                if (selectedWorkers.length === 0) {
                    document.getElementById('workers-error').classList.add('visible');
                    isValid = false;
                } else {
                    document.getElementById('workers-error').classList.remove('visible');
                }
                
                return isValid;
            }
            
            function validateStep4() {
                let isValid = true;
                
                // Terms and conditions
                const termsCheck = document.getElementById('termsCheck');
                if (!termsCheck.checked) {
                    document.getElementById('terms-error').classList.add('visible');
                    isValid = false;
                } else {
                    document.getElementById('terms-error').classList.remove('visible');
                }
                
                // Credit card validation (only if credit card is selected)
                if (document.getElementById('creditCard').checked) {
                    // Card name validation
                    const cardName = document.getElementById('cardName');
                    if (!cardName.value.trim()) {
                        showError(cardName, 'cardName-error', 'Please enter the name on your card');
                        isValid = false;
                    } else {
                        hideError(cardName, 'cardName-error');
                    }
                    
                    // Card number validation
                    const cardNumber = document.getElementById('cardNumber');
                    const cardNumberRegex = /^\d{16}$/;
                    const formattedCardNumber = cardNumber.value.replace(/\s/g, '');
                    
                    if (!formattedCardNumber) {
                        showError(cardNumber, 'cardNumber-error', 'Please enter your card number');
                        isValid = false;
                    } else if (!cardNumberRegex.test(formattedCardNumber)) {
                        showError(cardNumber, 'cardNumber-error', 'Please enter a valid 16-digit card number');
                        isValid = false;
                    } else {
                        hideError(cardNumber, 'cardNumber-error');
                    }
                    
                    // Expiration date validation
                    const expDate = document.getElementById('expDate');
                    const expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
                    
                    if (!expDate.value.trim()) {
                        showError(expDate, 'expDate-error', 'Please enter expiration date');
                        isValid = false;
                    } else if (!expDateRegex.test(expDate.value.trim())) {
                        showError(expDate, 'expDate-error', 'Please use MM/YY format');
                        isValid = false;
                    } else {
                        // Check if date is in the future
                        const [month, year] = expDate.value.split('/');
                        const expiryDate = new Date('20' + year, month - 1);
                        const today = new Date();
                        
                        if (expiryDate < today) {
                            showError(expDate, 'expDate-error', 'Card has expired');
                            isValid = false;
                        } else {
                            hideError(expDate, 'expDate-error');
                        }
                    }
                    
                    // CVV validation
                    const cvv = document.getElementById('cvv');
                    const cvvRegex = /^\d{3,4}$/;
                    
                    if (!cvv.value.trim()) {
                        showError(cvv, 'cvv-error', 'Please enter CVV');
                        isValid = false;
                    } else if (!cvvRegex.test(cvv.value.trim())) {
                        showError(cvv, 'cvv-error', 'CVV must be 3 or 4 digits');
                        isValid = false;
                    } else {
                        hideError(cvv, 'cvv-error');
                    }
                }
                
                return isValid;
            }
            
            function showError(input, errorId, message) {
                input.classList.add('error');
                const errorElement = document.getElementById(errorId);
                errorElement.textContent = message;
                errorElement.classList.add('visible');
            }
            
            function hideError(input, errorId) {
                input.classList.remove('error');
                document.getElementById(errorId).classList.remove('visible');
            }
            
            function updateSummary() {
                // Get form values
                const serviceType = document.getElementById('serviceType').value;
                const numWorkers = document.getElementById('numWorkers').value;
                const bookingDate = document.getElementById('bookingDate').value;
                const bookingTime = document.getElementById('bookingTime').value;
                const address = document.getElementById('address').value;
                const city = document.getElementById('city').value;
                const zipCode = document.getElementById('zipCode').value;
                
                // Format service name
                let serviceName = '';
                if (serviceType) {
                    serviceName = serviceType.charAt(0).toUpperCase() + serviceType.slice(1) + ' Help';
                }
                
                // Format date and time
                let dateTimeStr = '';
                if (bookingDate && bookingTime) {
                    const dateObj = new Date(bookingDate);
                    const formattedDate = dateObj.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                    });
                    
                    // Convert 24h time to 12h format
                    let [hours, minutes] = bookingTime.split(':');
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    const formattedTime = hours + ':' + minutes + ' ' + ampm;
                    
                    dateTimeStr = formattedDate + ' at ' + formattedTime;
                }
                
                // Format location
                let locationStr = '';
                if (address && city) {
                    locationStr = `${address}, ${city}, ${zipCode}`;
                }
                
                // Update summary elements
                document.getElementById('summaryService').textContent = serviceName || '-';
                document.getElementById('summaryWorkers').textContent = numWorkers ? `${numWorkers} Worker${numWorkers > 1 ? 's' : ''}` : '-';
                document.getElementById('summaryDateTime').textContent = dateTimeStr || '-';
                document.getElementById('summaryLocation').textContent = locationStr || '-';
            }
            
            function updatePricing() {
                // Get values
                const serviceType = document.getElementById('serviceType').value;
                const numWorkers = parseInt(document.getElementById('numWorkers').value) || 1;
                const hours = 4; // Fixed at 4 hours
                
                // Calculate costs
                const hourlyRate = serviceType ? (serviceRates[serviceType] || 25) : 25;
                const workerCost = hourlyRate * numWorkers * hours;
                const serviceFee = 20;
                const total = workerCost + serviceFee - promoDiscount;
                
                // Update display
                document.getElementById('summaryRate').textContent = `${hourlyRate}/hour × ${numWorkers} worker${numWorkers > 1 ? 's' : ''} × ${hours} hours`;
                document.getElementById('workerTotal').textContent = `${workerCost.toFixed(2)}`;
                document.getElementById('serviceFee').textContent = `${serviceFee.toFixed(2)}`;
                
                if (promoApplied) {
                    document.getElementById('discountRow').style.display = 'flex';
                    document.getElementById('discountAmount').textContent = `-${promoDiscount.toFixed(2)}`;
                } else {
                    document.getElementById('discountRow').style.display = 'none';
                }
                
                document.getElementById('totalAmount').textContent = `${total.toFixed(2)}`;
            }
            
            function applyPromoCode() {
                const promoInput = document.getElementById('promoCode');
                const promoError = document.getElementById('promo-error');
                const promoSuccess = document.getElementById('promo-success');
                const promoCode = promoInput.value.trim().toUpperCase();
                
                // Reset states
                promoError.classList.remove('visible');
                promoSuccess.style.display = 'none';
                
                if (!promoCode) {
                    promoError.textContent = 'Please enter a promo code';
                    promoError.classList.add('visible');
                    return;
                }
                
                if (promoCodes[promoCode] !== undefined) {
                    // Valid promo code
                    promoDiscount = promoCodes[promoCode];
                    promoApplied = true;
                    promoSuccess.style.display = 'block';
                    promoInput.disabled = true;
                    document.getElementById('applyPromo').disabled = true;
                    updatePricing();
                } else {
                    // Invalid promo code
                    promoError.textContent = 'Invalid promo code';
                    promoError.classList.add('visible');
                }
            }
            
            // Format inputs
            document.getElementById('cardNumber').addEventListener('input', function(e) {
                // Remove non-digits
                let input = this.value.replace(/\D/g, '');
                
                // Add spaces after every 4 digits
                let formatted = '';
                for (let i = 0; i < input.length; i++) {
                    if (i > 0 && i % 4 === 0) {
                        formatted += ' ';
                    }
                    formatted += input[i];
                }
                
                // Limit to 16 digits (plus spaces)
                this.value = formatted.substring(0, 19);
            });
            
            document.getElementById('expDate').addEventListener('input', function(e) {
                // Remove non-digits and slashes
                let input = this.value.replace(/[^\d/]/g, '');
                
                // Format as MM/YY
                if (input.length > 2 && !input.includes('/')) {
                    input = input.substring(0, 2) + '/' + input.substring(2);
                }
                
                this.value = input.substring(0, 5);
            });
            
            document.getElementById('cvv').addEventListener('input', function(e) {
                // Remove non-digits
                let input = this.value.replace(/\D/g, '');
                
                // Limit to 4 digits
                this.value = input.substring(0, 4);
            });
        });


        // Payment Razor Pay

        function makePayment() {
    var options = {
      key: "rzp_test_hIOpXSWVpEGXMN", // Your Razorpay API Key
      amount: "200000", // Amount in the smallest currency unit (for example, 1000 paise = 10 INR)
      currency: "INR", // Currency
      name: "WorkForceConnect", // Your website name
      description: "Payment for services",
      image: "https://example.com/logo.png", // Your website logo (optional)
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // You can send this payment ID to your server to verify the payment
      },
      prefill: {
        name: "Naveen",
        email: "itznaveenagsthya@gmail.com",
        contact: "9110677146"
      },
      notes: {
        address: "Bengaluru"
      },
      theme: {
        color: "#F37254" // Customize the theme color (optional)
      }
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  }