﻿$(document).on('click', '#copyrekvisits', function(){
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