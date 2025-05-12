// Tab functionality
        function openTab(evt, tabName) {
            var i, tabcontent, tablinks;
            
            // Hide all tab content
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].classList.remove("active-tab");
            }
            
            // Remove "active" class from all tab buttons
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            
            // Show the current tab and add "active" class to the button
            document.getElementById(tabName).classList.add("active-tab");
            evt.currentTarget.className += " active";
        }
        
        // Mark notification as read
        function markAsRead(button) {
            const notificationItem = button.closest('.notification-item');
            notificationItem.classList.remove('unread');
            button.remove();
            
            // Update notification count
            updateNotificationCount();
        }
        
        // Mark all notifications as read
        function markAllAsRead() {
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            unreadNotifications.forEach(item => {
                item.classList.remove('unread');
                const markAsReadBtn = item.querySelector('.btn-secondary');
                if (markAsReadBtn) markAsReadBtn.remove();
            });
            
            // Update notification count
            updateNotificationCount();
        }
        
        // Update notification count
        function updateNotificationCount() {
            const unreadCount = document.querySelectorAll('.notification-item.unread').length;
            const notificationCount = document.querySelector('.notification-count');
            
            if (unreadCount > 0) {
                notificationCount.textContent = unreadCount;
                notificationCount.style.display = 'flex';
            } else {
                notificationCount.style.display = 'none';
            }
        }
        
       
        // View payment
        function viewPayment() {
            // In a real app, this would show payment details
            alert('Viewing payment details...');
        }
        
        // View policies
        function viewPolicies() {
            // In a real app, this would navigate to the policies page
            alert('Navigating to policies page...');
        }
        
        // Pay Now - Redirect to payments tab
        function payNow() {
            openTab({currentTarget: document.querySelectorAll('.tablinks')[1]}, 'payments');
            
            // Pre-fill payment form
            document.getElementById('payment-amount').value = '50';
            document.getElementById('payment-type').value = 'platform-fee';
            document.getElementById('payment-description').value = 'Platform fees payment';
        }
        
        // Process payment
        function processPayment() {
            const amount = document.getElementById('payment-amount').value;
            const type = document.getElementById('payment-type').value;
            const description = document.getElementById('payment-description').value;
            const method = document.getElementById('payment-method').value;
            const date = document.getElementById('payment-date').value || new Date().toISOString().split('T')[0];
            
            // Form validation
            if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
                alert('Please enter a valid amount.');
                return;
            }
            
            if (!description) {
                alert('Please enter a payment description.');
                return;
            }
            
            // Show credit card form if payment method is credit/debit card
            if (method === 'credit-card' || method === 'debit-card') {
                document.getElementById('credit-card-form').style.display = 'block';
                
                // Scroll to credit card form
                document.getElementById('credit-card-form').scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // For other payment methods, show confirmation modal directly
                showPaymentModal(amount, method, description, date);
            }
        }
        
        // Confirm payment after entering credit card details
        function confirmPayment() {
            const amount = document.getElementById('payment-amount').value;
            const method = document.getElementById('payment-method').value;
            const description = document.getElementById('payment-description').value;
            const date = document.getElementById('payment-date').value || new Date().toISOString().split('T')[0];
            
            // Credit card validation
            const cardNumber = document.getElementById('card-number').value;
            const cardName = document.getElementById('card-name').value;
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;
            
            if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
                alert('Please enter a valid 16-digit card number.');
                return;
            }
            
            if (!cardName) {
                alert('Please enter the cardholder name.');
                return;
            }
            
            if (!expiryDate || !expiryDate.match(/^\d{2}\/\d{2}$/)) {
                alert('Please enter expiry date in MM/YY format.');
                return;
            }
            
            if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
                alert('Please enter a valid 3-digit CVV code.');
                return;
            }
            
            // Show payment confirmation modal
            showPaymentModal(amount, method, description, date);
        }
        
        // Show payment confirmation modal
        function showPaymentModal(amount, method, description, date) {
            // Format date
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Update modal content
            document.getElementById('modal-amount').textContent = ' + parseFloat(amount).toFixed(2)';
            document.getElementById('modal-method').textContent = method.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            document.getElementById('modal-description').textContent = description;
            document.getElementById('modal-date').textContent = formattedDate;
            
            // Show modal
            document.getElementById('payment-modal').style.display = 'block';
        }
        
        // Finalize payment
        function finalizePayment() {
            // Close payment confirmation modal
            closeModal('payment-modal');
            
            // Get payment amount for success message
            const amount = document.getElementById('payment-amount').value;
            
            // Generate a random transaction ID
            const transactionId = 'TX' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
            
            // Update success modal content
            document.getElementById('success-amount').textContent = ' + parseFloat(amount).toFixed(2)';
            document.getElementById('transaction-id').textContent = transactionId;
            
            // Show success modal
            document.getElementById('success-modal').style.display = 'block';
            
            // Reset payment form
            document.getElementById('payment-amount').value = '';
            document.getElementById('payment-description').value = '';
            document.getElementById('payment-date').value = '';
            document.getElementById('credit-card-form').style.display = 'none';
            
            if (document.getElementById('card-number')) {
                document.getElementById('card-number').value = '';
                document.getElementById('card-name').value = '';
                document.getElementById('expiry-date').value = '';
                document.getElementById('cvv').value = '';
            }
            
            // Add payment to history (in a real app, this would be done via API)
            addPaymentToHistory(amount, document.getElementById('payment-type').value, new Date());
        }
        
        // Add payment to history
        function addPaymentToHistory(amount, type, date) {
            const historyList = document.querySelector('.history-list');
            
            // Format payment type
            const formattedType = type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            
            // Format date
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Create new history item
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-item-details">
                    <span class="history-item-title">${formattedType}</span>
                    <span class="history-item-date">${formattedDate}</span>
                </div>
                <span class="history-item-amount">${amount}</span>
            `;
            
            // Add to top of history list
            historyList.insertBefore(historyItem, historyList.firstChild);
        }
        
        // Close modal
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }
        
        // Download payment history
        function downloadPaymentHistory() {
            // In a real app, this would generate a CSV or PDF file
            alert('Downloading payment history...');
        }
        
        // Run when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Update notification count
            updateNotificationCount();
            
            // Set default date to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('payment-date').value = today;
            
            // Close modals when clicking outside
            window.onclick = function(event) {
                const modals = document.getElementsByClassName('modal');
                for (let i = 0; i < modals.length; i++) {
                    if (event.target === modals[i]) {
                        modals[i].style.display = 'none';
                    }
                }
            };
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