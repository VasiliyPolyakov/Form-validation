(function() {
	'use strict';

	var addressVerific = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];
	window.addressVerific;

	var userEmail = document.getElementById("email");
	var userPassword = document.getElementById("password");
	var userCity = document.getElementById("city");
	var userPhone = document.getElementById("phone");
	var userCheckbox = document.querySelector('.form-checkbox__input');
	var userSubmitButton = document.querySelector('.form-button__input');

	var divEmailError = document.querySelector('.form-email__error');
	var divPasswordError = document.querySelector('.form-password__error');
	var divPhoneError = document.querySelector('.form-phone__error');

	var flags = {
		email: false,
		password: false,
		phone: true,
		heckbox: false
	};

	var inputFiels = [{
		fieldId: 'email',
		validator: emailValidator
	}, {
		fieldId: 'password',
		validator: passwordValidator
	}, {
		fieldId: 'phone',
		validator: phoneValidator
	}];

	setupEventHandlers(inputFiels);

	function setupEventHandlers(fields) {
		userCheckbox.addEventListener('click', checkboxValidator, false);

		fields.forEach(function(field) {
			var element = document.getElementById(field.fieldId);
			element.addEventListener('keyup', field.validator, false);
			element.addEventListener('onpaste', field.validator, false);
			element.addEventListener('blur', field.validator, false);
		});
	}

	function checkboxValidator() {

		if (userCheckbox.checked === true) {
			flags.heckbox = true;
		} else if (userCheckbox.checked === false) {
			flags.heckbox = false;
		}
		submitActivator();
	}

	function emailValidator() {

		clearTimeout(emailTimeout);
		var  emailTimeout = setTimeout(function() {
			var reg = /^[a-zA-Z0-9._]+?@[a-z0-9.-]+\.[a-z0-9.-]+$/g;

			if (!userEmail.value) {
				divEmailError.innerHTML = "Поле обязательно к заполнению";
				show(divEmailError);
				addClass(userEmail, 'form-email__input');
				flags.email = false;
			} else if (!reg.test(userEmail.value)) {
				divEmailError.innerHTML = "Ошибка в Email";
				show(divEmailError);
				addClass(userEmail, 'form-email__input');
				flags.email = false;
			} else if (addressVerific.indexOf(userEmail.value) !== -1) {
				divEmailError.innerHTML = "Такой Email уже существует";
				show(divEmailError);
				addClass(userEmail, 'form-email__input');
				flags.email = false;
			} else {
				hide(divEmailError);
				removeClass(userEmail, 'form-email__input');
				flags.email = true;
			}
			submitActivator();
		}, 500);
	}

	function passwordValidator() {

		clearTimeout(passwordTimeout);
		var passwordTimeout = setTimeout(function() {
			var regSimple = /[^a-zA-Z0-9]+?/g;
			var regMinFive = /[A-Za-z0-9_-]{5}?$/i;
			var regForbidden = /[!№;%:?*()_!@#$%^&*]/i;

			if (!userPassword.value) {
				divPasswordError.innerHTML = "Поле обязательно к заполнению";
				show(divPasswordError);
				addClass(userPassword, 'form-password__input');
				flags.password = false;
			} else if (regForbidden.test(userPassword.value)) {
				divPasswordError.innerHTML = "Пароль содержит запрещенные символы (!№;%:?*()_!@#$%^&*). Разрешены a-z A-Z 0-9";
				show(divPasswordError);
				addClass(userPassword, 'form-password__input');
				flags.password = false;
			} else if (regSimple.test(userPassword.value)) {
				divPasswordError.innerHTML = "Пароль содержит запрещенные символы. Разрешены a-z A-Z 0-9";
				show(divPasswordError);
				addClass(userPassword, 'form-password__input');
				flags.password = false;
			} else if (!regMinFive.test(userPassword.value)) {
				divPasswordError.innerHTML = "Пароль должен состоять из 5ти символов";
				show(divPasswordError);
				addClass(userPassword, 'form-password__input');
				flags.password = false;
			} else {
				hide(divPasswordError);
				removeClass(userPassword, 'form-password__input');
				flags.password = true;
			}
			submitActivator();
		}, 500);
	}

	function phoneValidator() {

		clearTimeout(phoneTimeout);

		var phoneTimeout = setTimeout(function() {
			var regPhone = /\+380\d{9}/g;

			if (!userPhone.value) {
				hide(divPhoneError);
				removeClass(userPhone, 'form-phone__input');
				flags.phone = true;
			} else if (!regPhone.test(userPhone.value)) {
				show(divPhoneError);
				addClass(userPhone, 'form-phone__input');
				flags.phone = false;
			} else {
				hide(divPhoneError);
				removeClass(userPhone, 'form-phone__input');
				flags.phone = true;
			}
			submitActivator();
		}, 1000);
	}

	function show(nodeError) {
		nodeError.style.display = 'block';
	}

	function hide(nodeError) {
		nodeError.style.display = 'none';
	}

	function addClass(element, clas) {
		var re = new RegExp("(^|\\s)" + clas + "(\\s|$)", "g");
		if (re.test(element.className)) return;
		element.className = (element.className + " " + clas).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
	}

	function removeClass(element, clas) {
		var re = new RegExp("(^|\\s)" + clas + "(\\s|$)", "g");
		element.className = element.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
	}

	function submitActivator() {

		if (flags.heckbox === true && flags.password === true && flags.email === true && flags.phone === true) {
			removeClass(userSubmitButton, 'disabled');
		} else {
			addClass(userSubmitButton, 'disabled');
		}
	}
}());