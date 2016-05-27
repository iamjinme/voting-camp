$(document).ready(function() {
  $('#new').click(function() {
    window.location.href = '/admin/new'
  });
  $('#my').click(function() {
    window.location.href = '/admin/polls'
  });
  $('#more').click(function() {
    $('#options').append('<input type="text" name="options[]" placeholder="...and more" class="form-input">');
  });
});
