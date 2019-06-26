$(document).ready(function () {
  $('.delete-produto').on('click', function (e) {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/produto/' + id,
      success: function (response) {
        alert('Deseja excluir este produto?');
        window.location.href = '/'
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
});
