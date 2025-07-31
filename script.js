
        // Form validation and handling
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');
        const messageTextarea = document.getElementById('message');
        const charCount = document.getElementById('charCount');

        // Character counter for message
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 900) {
                charCount.style.color = '#e74c3c';
            } else if (count > 800) {
                charCount.style.color = '#f39c12';
            } else {
                charCount.style.color = '#666';
            }
        });

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation functions
        function validateFullName(name) {
            return name.trim().length >= 2 && name.trim().includes(' ');
        }

        function validateEmail(email) {
            return emailRegex.test(email.trim());
        }

        function validateSubject(subject) {
            return subject.trim().length >= 3;
        }

        function validateMessage(message) {
            return message.trim().length >= 10;
        }

        // Show error function
        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorDiv = document.getElementById(fieldId + 'Error');
            
            field.classList.add('input-error');
            field.classList.remove('input-success');
            errorDiv.textContent = '⚠️ ' + message;
            errorDiv.classList.add('show');
        }

        // Show success function
        function showSuccess(fieldId) {
            const field = document.getElementById(fieldId);
            const errorDiv = document.getElementById(fieldId + 'Error');
            
            field.classList.remove('input-error');
            field.classList.add('input-success');
            errorDiv.classList.remove('show');
        }

        // Real-time validation
        document.getElementById('fullName').addEventListener('blur', function() {
            const value = this.value.trim();
            if (value === '') {
                showError('fullName', 'Please enter your full name');
            } else if (!validateFullName(value)) {
                showError('fullName', 'Please enter your first and last name');
            } else {
                showSuccess('fullName');
            }
        });

        document.getElementById('email').addEventListener('blur', function() {
            const value = this.value.trim();
            if (value === '') {
                showError('email', 'Please enter your email address');
            } else if (!validateEmail(value)) {
                showError('email', 'Please enter a valid email address');
            } else {
                showSuccess('email');
            }
        });

        document.getElementById('subject').addEventListener('blur', function() {
            const value = this.value.trim();
            if (value === '') {
                showError('subject', 'Please enter a subject');
            } else if (!validateSubject(value)) {
                showError('subject', 'Subject must be at least 3 characters long');
            } else {
                showSuccess('subject');
            }
        });

        document.getElementById('message').addEventListener('blur', function() {
            const value = this.value.trim();
            if (value === '') {
                showError('message', 'Please enter your message');
            } else if (!validateMessage(value)) {
                showError('message', 'Message must be at least 10 characters long');
            } else {
                showSuccess('message');
            }
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const fullName = formData.get('fullName').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            let isValid = true;
            
            // Validate all fields
            if (!fullName) {
                showError('fullName', 'Please enter your full name');
                isValid = false;
            } else if (!validateFullName(fullName)) {
                showError('fullName', 'Please enter your first and last name');
                isValid = false;
            } else {
                showSuccess('fullName');
            }
            
            if (!email) {
                showError('email', 'Please enter your email address');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                showSuccess('email');
            }
            
            if (!subject) {
                showError('subject', 'Please enter a subject');
                isValid = false;
            } else if (!validateSubject(subject)) {
                showError('subject', 'Subject must be at least 3 characters long');
                isValid = false;
            } else {
                showSuccess('subject');
            }
            
            if (!message) {
                showError('message', 'Please enter your message');
                isValid = false;
            } else if (!validateMessage(message)) {
                showError('message', 'Message must be at least 10 characters long');
                isValid = false;
            } else {
                showSuccess('message');
            }
            
            if (isValid) {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                submitBtn.textContent = '';
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    submitBtn.textContent = 'Send Message';
                    
                    // Show success message
                    successMessage.style.display = 'block';
                    form.reset();
                    charCount.textContent = '0';
                    
                    // Remove success classes
                    document.querySelectorAll('.input-success').forEach(input => {
                        input.classList.remove('input-success');
                    });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                    
                    console.log('Form submitted:', { fullName, email, subject, message });
                }, 2000);
            }
        });

        // Clear error on input
        document.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                if (this.classList.contains('input-error')) {
                    this.classList.remove('input-error');
                    const errorDiv = document.getElementById(this.id + 'Error');
                    errorDiv.classList.remove('show');
                }
            });
        });
    