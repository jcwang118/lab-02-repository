'use strict';

function Horn(horn) {
  this.name = horn.name;
  this.image_url = horn.image_url;
  this.description = horn.description;
}

Horn.allHorns = [];

Horn.prototype.render = function(){
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');

  let hornHtml = $('#photo-template').html();

  hornClone.html(hornHtml)

  hornClone.find('h2').text(this.name);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.name);
}

Horn.readJson = () => {
  $.get('/data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Horn.allHorns.push(new Horn(item));
      })
    })
    .then(Horn.loadHorns)
}

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => horn.render())
}

$(() => Horn.readJson());

$('select[name="animal"]').on('change', function(){
  let $selection = $(this).val();
  $('img').hide()
  $(`img[data-horn = "${$selection}"]`).show()
}) 

