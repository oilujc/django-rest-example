$.ajax({
		url: '/api/products/',
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			if (data) {
				$('tbody').html('');
				$.each(data, function(index, val) {
					var checked = 'checked=""';
					var badge = 'badge-primary';
					var value = !val.is_active;
					if (val.is_active === false) {
						checked = "";
						badge = 'badge-danger';
					}
					$('tbody').append('<tr>' +
						'<th scope="row">' + val.id + '</th>' +
						'<td>' + val.title + '</td>' +
						'<td>' + val.description + '</td>' +
						'<td><span class="badge '+badge+'">' + val.is_active + '</span></td>' +
						'<td>Change <input type="checkbox" name="is_active" value="'+value+'" onchange="desactive('+val.id+')" id="'+val.id+'" ' + checked + '"></td>' +
						'</tr>');
				});

			}
		},
	});

function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
	return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function desactive(id) {
	console.log($("#"+id+"").val());
	$.ajax({
		url: 'api/products/'+id+'/edit',
		type: 'PUT',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({'is_active': $("#"+id+"").val()}),
		beforeSend: function(xhr, settings) {
			if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
				xhr.setRequestHeader("X-CSRFToken", csrftoken);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			document.write(XMLHttpRequest.responseText);
		},
		success: function (data) {
			if (data) {
				var checked = 'checked=""';
				var badge = 'badge-primary';
				var value = !data.is_active;
				if (data.is_active === false) {
					checked = "";
					badge = 'badge-danger';
				}

				$('tr:has(#'+id+')').html(
				'<th scope="row">' + data.id + '</th>' +
				'<td>' + data.title + '</td>' +
				'<td>' + data.description + '</td>' +
				'<td><span class="badge '+badge+'">' + data.is_active + '</span></td>' +
				'<td>Change <input type="checkbox" name="is_active" value="'+value+'" onchange="desactive('+data.id+')" id="'+data.id+'" ' + checked + '"></td>');
			}
		}
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}