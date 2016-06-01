$(document).ready(function() {
  $('#new').click(function() {
    window.location.href = '/admin/new'
  });
  $('#my').click(function() {
    window.location.href = '/admin/polls'
  });
  $('#more').click(function() {
    $('#options').append('<input type="text" name="options[]" placeholder="...and more" class="form-input">');
    e.preventDefault();
  });
  // Delete functions actions
  $('.delete').click(function() {
    var tr = $(this).parent().parent().data();
    $('#delete_title').html(tr.title);
    $('#delete_enter').data('hash', tr.hash);
    $('#delete').addClass('active');
  });
  $('#delete_cancel').click(function() {
    $('#delete').removeClass('active');
  });
  $('#delete_enter').click(function() {
    var hash = $(this).data('hash');
    $('#delete').removeClass('active');
    $.ajax({
      url: '/api/polls/' + hash,
      type: 'DELETE'
    }).done(function(json){
      if(json.error) {
        $('#message').html(' ' + json.message);
        $('div.toast').removeClass('toast-success').addClass('toast-danger').removeClass('hide');
      } else {
        $('#tr_' + hash).remove();
        $('#message').html(' Poll deleted successfull!');
        $('div.toast').removeClass('toast-danger').addClass('toast-success').removeClass('hide');
      }
    });
  });
  // Create Donut Graph
  function createGraph(data) {
    $('#donut').html('');
    Morris.Donut({
      element: 'donut',
      colors: ['#727272', '#009688', '#FFC107', '#1976D2'],
      data: data
    });
  };
  if($('#donut').length && data_graph.length) {
    createGraph(data_graph);
  };
  // Clear buttons
  $('.btn-clear').click(function() {
    var modal = $(this).data('modal');
    if (modal) {
      $(modal).removeClass('active');
    } else {
      $(this).parent().addClass('hide');
    }
  })
  // Add actions
  $('.add').click(function() {
    var tr = $(this).parent().parent().data();
    $('#add_title').html('New option for ' + tr.title);
    $('#add_hash').val(tr.hash);
    $('#add').addClass('active');
  });
  $('#add_cancel').click(function() {
    $('#add').removeClass('active');
  });
  $('#add_enter').click(function() {
    $('#add_poll').submit();
  });
  // Submit Form :: Add Poll
  $('#add_poll')
  .submit(function(e) {
    console.log($('add-option').val(), 'add-option');
    var data = $(this).serialize();
    if ($('#add-option').val()) {
      $('#add').removeClass('active');
      $.ajax({
        url: '/api/add',
        type: 'POST',
        data: data
      }).done(function(json){
        if(json.error) {
          $('#message').html(' ' + json.message);
          $('div.toast').removeClass('toast-success').addClass('toast-danger').removeClass('hide');
        } else {
          $('#message').html(' Fine, the option has been add to Poll!');
          $('div.toast').removeClass('toast-danger').addClass('toast-success').removeClass('hide');
          createGraph(json);
        }
      });
    };
    e.preventDefault();
  });
  // Submit Form :: Vote Poll
  $('#vote_poll')
  .submit(function(e) {
    var data = $(this).serialize();
    if ($('select').val() !== '') {
      $.ajax({
        url: '/api/vote',
        type: 'POST',
        data: data
      }).done(function(json){
        if(json.error) {
          $('#message').html(' ' + json.message);
          $('div.toast').removeClass('toast-success').addClass('toast-danger').removeClass('hide');
        } else {
          $('#message').html(' Great, you vote has been registered!');
          $('div.toast').removeClass('toast-danger').addClass('toast-success').removeClass('hide');
          createGraph(json);
        }
      });
    };
    e.preventDefault();
  });
  // Submit Form :: New Poll
  $('#new_poll')
  .submit(function(e) {
    var data = $(this).serialize();
    if ($("#title").val()) {
      $.ajax({
        url: '/api/polls',
        type: 'POST',
        data: data
      }).done(function(json){
        $('div.hide').removeClass('hide');
        $('#message').html(' Great, you have created poll "' + json.title + '"');
        $('#go_poll').attr('href', '/polls/' + json.hash);
        $('#new_poll').addClass('hide');
      });
    };
    e.preventDefault();
  });
});
