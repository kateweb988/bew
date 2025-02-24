$(document).on('input', '.disab_vys', function () {
	let vz = calcool_zab_form.vysot_zabora.value;
	$('#dlina_lista').empty();
	const array = { '1.5': '1,50 метра', '1.8': '1,80 метра', '2.0': '2,00 метра', '2.2': '2,20 метра', '2.5': '2,50 метра', '3.0': '3,00 метра', '6.0': '6,00 метров' };
	$('#dlina_lista').append('<option value="" selected disabled></option>');
	$.each(array, function (k, v) {
		if (k >= vz) {
			$('#dlina_lista').append('<option value="' + k + '">' + v + '</option>');
		}
	});
	$('#id_dlin').addClass('red');
	calcool_zab();
});

$(document).on('input', '.remove_red', function () {
	$(this).prev().removeClass('red');
	calcool_zab();
});


$(document).on('change', '.type_zab_rad', function () {
	if ($(this).attr('checked', 'checked')) { calcool_zab_form.radio_okras.value = $(this).data('chek'); }
	calcool_zab();
});

$(document).on('input', '.calcool_zab', function () {
	calcool_zab();
});

if (navigator.cookieEnabled === false) { } else {
	setTimeout(function () {
		let vis = JSON.stringify(sbjs.get);
		vis = vis.replaceAll('&', '||');
		$.ajax({
			type: 'post', data: 'f=visits&vis=' + vis, success: function (result) {
			}
		});
	}, 3000);
}

function calcool_zab() {
	let data = $('#calcool_zab_form').serialize();
	$.ajax({
		url: '', type: 'post', data: 'f=calcool_zab&' + data, success: function (result) {
			let obj = JSON.parse(result);
			document.getElementById('kolvo_stolbov').innerHTML = obj.kolvo_stolbov;
			document.getElementById('vysota_stolba').innerHTML = obj.vysota_stolba;
			document.getElementById('stlb_pogonm_ceil').innerHTML = obj.stlb_pogonm_ceil;
			document.getElementById('summa_zabora').innerHTML = obj.summa_zabora;
			//document.getElementById('ploshad').innerHTML = obj.ploshad;
			document.getElementById('kolvo_pogonm_ceil').innerHTML = obj.kolvo_pogonm_ceil;
			document.getElementById('kolvo_listov_ceil').innerHTML = obj.kolvo_listov_ceil;
			//document.getElementById('kolvo_pogonm').innerHTML = obj.kolvo_pogonm;
			//document.getElementById('kolvo_listov').innerHTML = obj.kolvo_listov;
			document.getElementById('ves_listov').innerHTML = obj.ves_listov;
			document.getElementById('laga_pogonm_ceil').innerHTML = obj.laga_pogonm_ceil;
			document.getElementById('laga_ves').innerHTML = obj.laga_ves;
			document.getElementById('stlb_ves').innerHTML = obj.stlb_ves;
			document.getElementById('sum_lagas').innerHTML = obj.sum_lagas;
			document.getElementById('sum_stolb').innerHTML = obj.sum_stolb;
			document.getElementById('summa_truby').innerHTML = obj.summa_truby;
			document.getElementById('summa_vsego').innerHTML = obj.summa_vsego;
			//console.log(obj);
		}
	});
}
$(document).on('input', '.calcool_proflist_ds', function () {
	let sum = document.getElementById('dlina').value * document.getElementById('shiri').value;
	let sumf = sum.toFixed(2);
	document.getElementById('ploch').value = sumf;
	document.getElementById('plosh').innerHTML = sumf;
	calcool_proflist();
});
$(document).on('input', '.calcool_proflist_ploch', function () {
	//document.getElementById('dlina').value = 0;
	//document.getElementById('shiri').value = 0;
	//document.getElementById('plosh').innerHTML = Number(this.value).toFixed(2);
	calcool_proflist();
});

$(document).on('input', '.calcool_proflist', function () {
	calcool_proflist();
});

function calcool_proflist() {
	let data = $('#calcool_proflist_form').serialize();
	$.ajax({
		url: '', type: 'post', data: 'f=calcool_proflist&' + data, success: function (result) {
			let obj = JSON.parse(result);
			document.getElementById('kolvo_listov').innerHTML = obj.kolvo_listov;
			document.getElementById('kolvo_pogonm').innerHTML = obj.kolvo_pogonm;
			document.getElementById('ves_listov').innerHTML = obj.ves_listov;
			document.getElementById('summa_zabora').innerHTML = obj.summa_zabora;
		}
	});
}

$(document).on('change', '#list_marka', function () {
	let list_idd = this.value;
	let okras = document.getElementById('radio_okras').value;
	$('#list_tolshina').empty();
	$.ajax({
		url: '', type: 'post', data: 'f=calcool_proflist_tolsh&idx=' + list_idd + '&okras=' + okras, success:
			function (result) {
				let tol_list = JSON.parse(result);
				var sele = 'selected';
				//$('#list_tolshina').append('<option value="" selected disabled></option>');
				$.each(tol_list, function (k, v) {
					$('#list_tolshina').append('<option class="py-2" value="' + v + '" ' + sele + '>' + v + '</option>');
					sele = '';
				});
				calcool_proflist();
			}
	});

});




$(document).on('change', '.type_prof_rad', function () {
	if ($(this).attr('checked', 'checked')) { calcool_proflist_form.radio_okras.value = $(this).data('chek'); }

	let okras = document.getElementById('radio_okras').value;

	function f1() {
		$.ajax({
			url: '', type: 'post', data: 'f=calcool_proflist_marka&okras=' + okras, success:
				function (result) {
					let foo = JSON.parse(result);
					var sel_mar = 'selected';
					$('#list_marka').empty();
					$.each(foo, function (km, vm) {
						$('#list_marka').append('<option class="py-2" value="' + km + '" ' + sel_mar + '>' + vm + '</option>');
						sel_mar = '';
					});
				}
		});
		f2();
	}

	function f2() {
		$.ajax({
			url: '', type: 'post', data: 'f=calcool_proflist_tolsh&idx=1&okras=' + okras, success:
				function (result) {
					let tol_list = JSON.parse(result);
					var sel_tol = 'selected';
					$('#list_tolshina').empty();
					$.each(tol_list, function (kt, vt) {
						$('#list_tolshina').append('<option class="py-2" value="' + vt + '" ' + sel_tol + '>' + vt + '</option>');
						sel_tol = '';
					});
					calcool_proflist();
				}
		});
	}

	f1();

});

$(document).on('change', '.type_prof_rab', function () {
	if ($(this).attr('checked', 'checked')) { calcool_proflist_form.radio_rabot.value = $(this).data('chek'); }
	calcool_proflist();
});

// изменяем количество одного товара
$(document).on('change', '.tovplus', function () {
	var idd = $(this).closest('.kolvotov').data('idd');
	var klv = $(this).val();
	$.ajax({
		type: 'post', data: 'idd=' + idd + '&klv=' + klv + '&f=num_basket', success: function (data) {
			let arr = data.split('|');
			let sum = parseFloat(arr[1]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
			sum = sum.replace(/\./, ',');
			document.getElementById("korz_kolvo").innerHTML = arr[0];
			document.getElementById("korz_summa").innerHTML = sum;
			document.getElementById("korz_total").innerHTML = sum + '&nbsp;₽';
		}
	});
});


(function () {
	var tUpdate = function () {
		var tBtns = document.querySelectorAll('[data-bs-tolsh]');
		for (var i = 0; i < tBtns.length; i++) {
			tBtns[i].addEventListener('click', function () {
				var ozink = document.getElementById('cOption').innerText;
				var tBtns2 = document.querySelectorAll('[data-bs-tolsh]');
				var target = this.dataset.bsTolsh;
				this.dataset.bsSelect = "1";
				//this.style.borderColor = '#666666';
				document.getElementById(target).textContent = this.innerText;
				if (ozink === "оцинкованный") {
					document.getElementById("zOption").textContent = this.dataset.bsCena;
					document.getElementById('id1042143').value = 1;
				} else {
					document.getElementById("zOption").textContent = this.dataset.bsZena;
					document.getElementById('id1042143').value = 1;
				}
			});
		}
	}();
	// colorOption
	var cUpdate = function () {
		var Labls = document.querySelectorAll('[data-bs-color]');
		for (var i = 0; i < Labls.length; i++) {
			Labls[i].addEventListener('click', function () {
				var target = this.dataset.bsColor;
				document.getElementById(target).textContent = this.dataset.bsValue;
				var elm0 = document.getElementById('sd0');
				if (this.dataset.bsValue == 'оцинкованный') {
					document.getElementById('sd0').style.display = 'none';
					document.getElementById('sd3').style.display = 'none';
					document.getElementById('sd6').style.display = 'none';
					document.getElementById('sd7').style.display = 'none';
					document.getElementById('tOption').textContent = 'нет';
					document.getElementById('zOption').textContent = 'нет';
					document.getElementById('id1042143').value = 1;
				} else {
					document.getElementById('sd0').style.display = 'block';
					document.getElementById('sd3').style.display = 'block';
					document.getElementById('sd6').style.display = 'block';
					document.getElementById('sd7').style.display = 'block';
					document.getElementById('tOption').textContent = 'нет';
					document.getElementById('zOption').textContent = 'нет';
					document.getElementById('id1042143').value = 1;
				}
			});
		}
	}();
})();

$(document).on('click', '.del_basket', function () {
	var idd = $(this).closest('.kolvotov').data('idd');
	$.ajax({ type: 'post', data: 'idd=' + idd + '&f=del_basket', success: function (data) { } });
	location.reload();
});
$(document).on('click', '.callzapros,.callme,.callme2', function () {
	location.href = '/zapros';
});
$(document).on('click', '.paramall', function () {
	$('.pararam').toggle();
	$(this).toggle();
});

/* search */
$(document).on('keyup', '#search', function () {
	var $result = $('#search_box-result');
	var search = $(this).val();
	if ((search !== '') && (search.length > 1)) {
		$.ajax({
			type: "POST",
			url: "/search.php",
			data: { 'search': search },
			success: function (msg) {
				$result.html(msg);
				if (msg !== '') {
					$result.fadeIn();
				} else {
					$result.fadeOut(100);
				}
			}
		});
	} else {
		$result.html('');
		$result.fadeOut(100);
	}
});
/* search */
$(document).on('keyup', '#search2_', function () {
	var $result = $('#search_box-result2');
	var search = $(this).val();
	if ((search !== '') && (search.length > 1)) {
		$.ajax({
			type: "POST",
			url: "/search.php",
			data: { 'search': search },
			success: function (msg) {
				$result.html(msg);
				if (msg !== '') {
					$result.fadeIn();
				} else {
					$result.fadeOut(100);
				}
			}
		});
	} else {
		$result.html('');
		$result.fadeOut(100);
	}
});
// butsearch
$(document).on('click', '.butsearch', function () {
	var search = $('#search').val();
	if (search !== "") { location.href = "/searchres?search=" + search; }
	return false;
});

// butsearch 2
$(document).on('click', '#butsearch2', function () {
	var search = $('#search2').val();
	if (search !== "") { location.href = "/searchres?search=" + search; }
	return false;
});

/*logout*/
$(document).on('click', '#logout', function () {
	deleteCookie('xuis');
	location.reload();
});


// Добавляем товар в корзину
$(document).on('click', '.add_item4', function () {
	var parentBoxx = this.parentNode; // родительский элемент кнопки "Добавить в корзину"
	var klv = parentBoxx.getElementsByTagName("input")[0].value;
	var idp = localStorage.getItem('_ym_uid');
	idp = idp.replace(/['"]+/g, '');
	var idt = $(this).data('idd');
	// Анимация добавления в корзину
	var img = $("#tovarimg" + idt);
	var bascket = $("#korzina");
	var w = img.width();
	img.clone()
		.css({ 'width': w, 'position': 'absolute', 'z-index': '9999', 'top': img.offset().top, 'left': img.offset().left })
		.appendTo("body")
		.animate({
			opacity: 0.05,
			left: bascket.offset()['left'],
			top: bascket.offset()['top'],
			width: 20
		},
			1000,
			function () { $(this).remove(); }
		);
	$.ajax({
		type: 'post', data: 'idt=' + idt + '&mul=0&idp=' + idp + '&klv=' + klv + '&f=add_basket', success: function (data) {
			let arr = data.split('|');
			let sum = parseFloat(arr[1]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
			sum = sum.replace(/\./, ',');
			document.getElementById("korz_kolvo").innerHTML = arr[0];
			document.getElementById("korz_summa").innerHTML = sum;
		}
	});
	return false;
});

// Добавляем товар в корзину из продукта
$(document).on('click', '.add_item_p', function () {
	var idp = localStorage.getItem('_ym_uid');
	idp = idp.replace(/['"]+/g, '');
	var klv = $('#id1042143').val(); // количество
	//var clr = $('.product-gallery-thumblist-item.active').data('kode'); // цвет
	var clr = $('#cOption').text();  // цвет
	var tls = $('#tOption').text();  // толщина
	if (clr === 'нет' || tls === 'нет') {
		if (clr === 'нет' && tls === 'нет') { document.getElementById("plistparam").innerHTML = "цвет/покрытие и толщину листа"; }
		else if (clr === 'нет') { document.getElementById("plistparam").innerHTML = "цвет/покрытие"; }
		else if (tls === 'нет') { document.getElementById("plistparam").innerHTML = "толщину листа"; }
		$("#myModal").modal('show');
		return false;
	}
	tls = tls.substring(0, tls.length - 2);
	// анимация добавления в корзину
	var that = $(".image-zoom").closest('.product-gallery-preview-item.active').find('img');
	var bascket = $("#korzina");
	var w = that.width();
	that.clone()
		.css({ 'width': w, 'position': 'absolute', 'z-index': '9999', top: that.offset().top, left: that.offset().left })
		.appendTo("body")
		.animate({ opacity: 0.05, left: bascket.offset()['left'], top: bascket.offset()['top'], width: 20 }, 1000, function () { $(this).remove(); });

	$.ajax({
		type: 'post', data: 'mul=1&idp=' + idp + '&klv=' + klv + '&clr=' + clr + '&tls=' + tls + '&f=add_basket', success: function (data) {
			let arr = data.split('|');
			let sum = parseFloat(arr[1]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
			sum = sum.replace(/\./, ',');
			document.getElementById("korz_kolvo").innerHTML = arr[0];
			document.getElementById("korz_summa").innerHTML = sum;
		}
	});
	return false;
});


// работаем с продуктом
$(document).on('click', '.select_du', function () {
	var one = $('#kolvoadd').val();
	var res = $('#duhtml_result');
	var rub = $('#rub');
	var sum = $('#sum');
	var ids = $(this).data('idd');
	$.ajax({
		type: 'post', data: 'ids=' + ids + '&f=duhtml_sel', success: function (msg) {
			res.html(msg);
			res.fadeIn();
		}
	});
	$.ajax({
		type: 'post', data: 'ids=' + ids + '&f=ducena_sel', success: function (msg) {
			rub.text(msg);
			sum.text(msg * one);
		}
	});
	return false;
});
// работаем с продуктом - выбор количества и получение общей стоимости
$(document).on('change', '#kolvoadd', function () {
	var one = $(this).val();
	var rub = $('#rub').text();
	var sum = one * rub;
	$("#sum").text(sum);
});

var cartCount1 = document.getElementById('cartcount1');
var cartCount2 = document.getElementById('cartcount2');
var cartCount3 = document.getElementById('cartcount3');
var cartClear = document.getElementById('cartclear');
// https://incode.pro/javascript/sozdaem-korzinu-pokupatelja-na-chistom-javascript-i-localstorage.html
function openCarts() {
	var cartData = getCartData('cart'), cartsum = getCartData('cart_summa'), cartord = getCartData('cart_order'), totalHead1 = '', totalHead2 = '', totalItems1 = '', totalItems2 = '', itnumb = 0, itcount = 0, itcount2 = 0;
	if (cartData !== null) {
		totalHead1 = '<div id="isnullhide"><div id="cartclear" class="btn btn-sm btn-danger">Очистить корзину1</div>&nbsp;&nbsp;<div id="cartreliz" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#podkupka">Оформить заказ</div>&nbsp;&nbsp;<div id="cartcontin" class="btn btn-sm btn-success">Продолжить покупки</div><br><br></div>';
		totalHead2 = '<div id="isnullhide"><div id="cartclear" class="btn btn-sm btn-danger">Удалить все</div>&nbsp;&nbsp;<div id="cartreliz" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#podkupka">Оформить</div>&nbsp;&nbsp;<div id="cartcontin" class="btn btn-sm btn-success">Продолжить</div><br><br></div>';
		totalItems1 = '<table class="table table-sm table-striped">' +
			'<thead class="thead-dark"><tr><th scope="col">№</th><th scope="col">Артикул</th><th scope="col">Наименование</th><th scope="col" class="text-right">Цена,&nbsp;₽</th><th scope="col" class="text-right">Кол&#8209;во</th><th scope="col" class="text-right">Едн.</th><th scope="col" class="text-right">Сумма,&nbsp;₽</th></tr></thead>';
		for (var items in cartData) {
			totalItems1 += '<tr class="arttovr apo" data-target="#tovone" data-idd="' + items + '" data-rub="' + cartData[items][1] + '" data-klv="' + cartData[items][2] + '" data-edn="' + cartData[items][3] + '" data-toggle="modal">';  //открываем модальное окно
			itnumb++;
			totalItems1 += '<td>' + itnumb + '</td>';
			totalItems1 += '<td>' + items + '</td>';
			//totalItems1 += '<td>'+items+'</td>';
			totalItems1 += '<td class="carttr">' + cartData[items][0] + '</td>';
			var endrub;
			if (cartData[items][1] === '0.00') { endrub = 'по запросу'; } else { endrub = cartData[items][1]; }
			totalItems1 += '<td class="text-right">' + endrub + '</td>';
			totalItems1 += '<td class="text-right">' + cartData[items][2] + '</td>';
			totalItems1 += '<td class="text-right">' + cartData[items][3] + '</td>';
			totalItems1 += '<td class="text-right">' + cartData[items][4].toFixed(2) + '</td>';
			itcount += +cartData[items][2];
			totalItems1 += '</tr>';
		}
		totalItems1 += '<tr class="table-primary"><td colspan="3" class="font-weight-bold">ИТОГО:</td><td></td><td class="text-right font-weight-bold">' + itcount + '</td><td></td><td class="text-right font-weight-bold">' + getCartData('cart_summa').toFixed(2) + '</td></tr>';
		totalItems1 += '</table>';
		cartCount1.innerHTML = totalHead1 + totalItems1;
		totalItems2 = '<div>';
		for (var items2 in cartData) {
			totalItems2 += '<div class="card mb-2">';
			totalItems2 += '<div class="arttovr apo" data-target="#tovone" data-idd="' + items2 + '" data-rub="' + cartData[items2][1] + '" data-klv="' + cartData[items2][2] + '" data-edn="' + cartData[items2][3] + '" data-toggle="modal">' + cartData[items2][0] + '</div>';
			var endrub2;
			if (cartData[items2][1] === '0.00') { endrub2 = 'по запросу'; } else { endrub2 = cartData[items2][1]; }
			totalItems2 += '<div>Цена: ' + endrub2 + '&nbsp;₽ Кол&#8209;во: ' + cartData[items2][2] + ' ' + cartData[items2][3] + '</div>';
			totalItems2 += '<div class="font-weight-bold">Сумма: ' + cartData[items2][4].toFixed(2) + '</div>';
			totalItems2 += '</div>';
			itcount2 += +cartData[items2][2];
		}
		totalItems2 += '<div class="font-weight-bold">ОБЩЕЕ КОЛИЧЕСТВО: ' + itcount2 + '</div>';
		totalItems2 += '<div class="font-weight-bold">СУММА ЗАКАЗА: ' + getCartData('cart_summa').toFixed(2) + '&nbsp;₽</div>';
		totalItems2 += '</div>';
		cartCount2.innerHTML = totalHead2 + totalItems2;
		return false;
	} else {
		if (cartord) {
			$.ajax({
				type: 'post', dataType: 'html', data: 'f=read_tpl&tpl=korz_alltovr&idd=' + cartord,
				success: function (data) {
					$('#korz_alltovr').html(data);
				}
			});
		} else {
			cartCount3.innerHTML = 'В корзине пока нет товаров.<br/>Перейдите в каталог или воспользуйтесь поиском, чтобы найти нужный товар.<br/><br/><a href="/"><div class="btn btn-success">Начать покупки</div></a>';
		}
	}
	return false;
}

$(document).on('click', '#cartcontin', function () {
	location.href = '/catalog';
});

$(document).on('change', '#mod_kklv', function () {
	var cena;
	if ($('#mod_krub').text() === 'по запросу') { cena = '0'; } else { cena = $('#mod_krub').text(); }
	var s = $(this).val() * cena;
	$('#onet_summ').text(s.toFixed(2));
});
// отправить данные корзины на сервер
$(document).on('click', '#send_korzina', function () {
	if ($('#obfio').val() === '' || $('#obfrm').val() === '' || $('#obeml').val() === '' || $('#obtlf').val() === '' || $('#obadr').val() === '') { alert('Заполните все поля формы.'); return false; }
	var cartData = getCartData('cart');
	var cartSuma = getCartData('cart_summa');
	cartData = JSON.stringify(cartData);
	$.ajax({
		type: 'post', data: 'f=korz_insr&dat=' + cartData + '&sum=' + cartSuma + '&fio=' + $('#obfio').val() + '&frm=' + $('#obfrm').val() + '&eml=' + $('#obeml').val() + '&tlf=' + $('#obtlf').val() + '&adr=' + $('#obadr').val() + '&com=' + $('#obcom').val(),
		success: function (data) {
			localStorage.setItem('cart_order', data);
			localStorage.removeItem('cart');
			document.cookie = 'order=' + data;
			localStorage.setItem('cart_summa', '0');
			location.href = '/order';
			//return false;
		}
	});
	return false;
});

$(document).ready(function () {
	$('body').on('click', '.number-minus, .number-plus', function () {
		var $row = $(this).closest('.number');
		var $input = $row.find('.number-text');
		var step = $row.data('step');
		var val = parseFloat($input.val());
		if ($(this).hasClass('number-minus')) {
			val -= step;
		} else {
			val += step;
		}
		$input.val(val);
		$input.change();
		return false;
	});
	$('body').on('change', '.number-text', function () {
		var $input = $(this);
		var $row = $input.closest('.number');
		var step = $row.data('step');
		var min = parseInt($row.data('min'));
		var max = parseInt($row.data('max'));
		var val = parseFloat($input.val());
		if (isNaN(val)) {
			val = step;
		} else if (min && val < min) {
			val = min;
		} else if (max && val > max) {
			val = max;
		}
		$input.val(val);
	});
});
$('body').on('input', '.number-text', function () {
	this.value = this.value.replace(/[^0-9]/g, '');
});


function getContent_filt(url, addEntry) {
	$('#catcontent').hide();
	$('.load_ic').fadeIn(100);
	$.get(url).done(function (data) {
		$('#catcontent').html($(data).find("#catcontent").html());
		$('#filters').html($(data).find("#filters").html());
		$('.load_ic').hide();
		if (addEntry === true) { history.pushState(null, null, url); }
		document.documentElement.scrollIntoView(true);
		let vyb_str = $('#all_vybr').data('allv');
		if (vyb_str != '') { $('#vybor_str').text('Вы выбрали: ' + vyb_str); }
		$('#catcontent').fadeIn(200);
	});
}
function getCheckedBoxes(i) {
	var selectedCheckBoxes = document.querySelectorAll('input.checkbox' + i + ':checked');
	var checkedValues = Array.from(selectedCheckBoxes).map(cb => cb.getAttribute('data-fidd'));
	var strval = checkedValues.join(':');
	return strval;
}


$(document).on('click', '.filtcheck', function () {
	let grp_arr = $('#all_grps').data('allg');
	let farr = grp_arr.split(',');
	let shir = [], itogk = [], itogv = [], fend = '', i = 0, b = 0, c = 0;
	while (i < farr.length) { shir[i] = getCheckedBoxes(i); if (shir[i] !== '') { itogk[b] = farr[i]; itogv[b] = shir[i]; b++; } i++; }
	while (c < itogk.length) { fend = fend + '&' + itogk[c] + '=' + itogv[c]; c++; }
	fend = fend.substr(1);
	if (fend !== '') { fend = encodeURIComponent(fend); }
	var url = new URL(document.location.href);
	var tgrval = url.searchParams.get('tgr');
	if (tgrval !== null) {
		if (fend !== '') {
			getContent_filt(location.pathname + '?tgr=' + tgrval + '&filt=on&' + fend, true);
		} else {
			getContent_filt(location.pathname + '?tgr=' + tgrval, true);
		}
	} else {
		if (fend !== '') {
			getContent_filt(location.pathname + '?filt=on&' + fend, true);
		} else {
			getContent_filt(location.pathname, true);
		}
	}
});



$(document).on('click', '.filt_hidden_list_show', function () {
	var el = $(this);
	var n = el.data('numb');
	if ($('.filt_hidden_list_' + n).is(':visible')) { el.html('показать все'); el.removeClass('icon-stup'); el.addClass('icon-stdn'); } else { el.html('cкрыть'); el.removeClass('icon-stdn'); el.addClass('icon-stup'); }
	$('.filt_hidden_list_' + n).toggle(200);
});

$(document).on('click', '#copyrekvisits', function () {
	const str = document.getElementById('rekvisits').innerText;
	const el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	$('.inbuff').fadeIn(200);
});

document.addEventListener('copy', function (e) {
	const text_only = document.getSelection().toString();
	const clipdata = e.clipboardData || window.clipboardData;
	clipdata.setData('text/plain', text_only);
	clipdata.setData('text/html', text_only);
	e.preventDefault();
});