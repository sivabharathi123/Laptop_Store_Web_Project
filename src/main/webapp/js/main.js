$(document).ready(function() {
	const apiUrl = '/Laptop_Store_Web_Project/api/laptops';
	navigateToSection('home');

	$('#navbar a').click(function(e) {
		e.preventDefault();
		let section = $(this).attr('href').substring(1);
		navigateToSection(section);
	});

	function navigateToSection(section) {
		$('#navbar a').removeClass('active');
		$('a[href="#' + section + '"]').addClass('active');
		$('#main-content').html('<h2>Loading ' + section + '...</h2>');

		switch (section) {
			case 'products':
				loadProducts();
				break;
			case 'admin':
				showAdminDashboard();
				break;
			case 'contact':
				loadContactForm();
				break;
			default:
				$('#main-content').html(`<h2>Welcome to Our Laptop Store</h2>
				<br>
				<br>
				<h3> Click on Products to see all available laptops </h3>
				<br>
				<br>
				<h3> Click on Admin Dashboard to manage laptop listings </h3>
				<br>
				<br>
				<h3> Click on Contact Us to let us know you feedback or enquiries <h3>
				<br>
				`);
				break;

		}
	}

	function loadProducts() {
		$.ajax({
			url: apiUrl,
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				let contentHtml = '<h2>Products</h2>';
				contentHtml += `<div class="row justify-content-end">
                                <div class="col-auto">
                                    <input type="text" id="searchBox" class="form-control" placeholder="Search..." onkeyup="filterProducts()">
                                </div>
                            </div><div class="row">`; // Adding a search box
				data.forEach(function(laptop) {
					contentHtml += `
                    <div class="col-md-3 product-card" data-brand="${laptop.brand.toLowerCase()}" data-model="${laptop.model.toLowerCase()}">
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" src="${laptop.thumbnail_url}" alt="Laptop image" style="height: 225px; width: 100%; display: block;">
                            <div class="card-body">
                                <p class="card-text">${laptop.prodtype}</p>
                                <p class="card-text">Model: ${laptop.model}</p>
                                <p class="card-text">Brand: ${laptop.brand}</p>
                                <p class="card-text">Processor: ${laptop.processor}</p>
                                <p class="card-text">RAM: ${laptop.ram}</p>
                                <p class="card-text">Hard Drive: ${laptop.harddrive}</p>
                                <p class="card-text">Price: $${laptop.price}</p>
                            </div>
                        </div>
                    </div>`;
				});
				contentHtml += '</div>'; // End of Bootstrap row
				$('#main-content').html(contentHtml);
			},
			error: function() {
				$('#main-content').html('<h2>Error loading products.</h2>');
			}
		});
	}



	window.deleteProduct = function(id) {
		if (confirm('Are you sure you want to delete this product?')) {
			$.ajax({
				url: apiUrl + '/' + id,
				type: 'DELETE',
				success: function() {
					loadProductsAdmin();
				},
				error: function() {
					alert('Error deleting product.');
				}
			});
		}
	};

	function showAdminDashboard() {
		if (!sessionStorage.getItem('isLoggedIn')) {
			$('#main-content').html(`
			<div id="admin-header">Admin Dashboard</div>
            <p>You must log in to view this section.</p>
            <button onclick="logIn()" class="btn btn-primary">Log In</button>
        `);
		} else {



			loadProductsAdmin(); // This will load the products as previously
		}
	}

	//new after search
	function loadProductsAdmin() {
		$.ajax({
			url: '/Laptop_Store_Web_Project/api/laptops',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				$('#main-content').html('<div id="admin-header">Welcome to the Admin Dashboard</div>');
		        $('#main-content').append(`
		            <div class="card-deck mb-3 text-center">
		                <div class="card mb-4 shadow-sm">
		                    <div class="card-header1">
		                        <h4 class="my-0 font-weight-normal">Total Laptops</h4>
		                    </div>
		                    <div class="card-body">
		                        <h1 class="card-title pricing-card-title" id="totalLaptops">Loading...</h1>
		                        <small class="text-muted">in stock</small>
		                    </div>
		                </div>
		                <div class="card mb-4 shadow-sm">
		                    <div class="card-header1">
		                        <h4 class="my-0 font-weight-normal">Laptops Sold</h4>
		                    </div>
		                    <div class="card-body">
		                        <h1 class="card-title pricing-card-title">1540</h1>
		                        <small class="text-muted">units sold</small>
		                    </div>
		                </div>
		                <div class="card mb-4 shadow-sm">
		                    <div class="card-header1">
		                        <h4 class="my-0 font-weight-normal">Sales Target</h4>
		                    </div>
		                    <div class="card-body">
		                        <h1 class="card-title pricing-card-title">10000</h1>
		                        <small class="text-muted">target for the year</small>
		                    </div>
		                </div>
		            </div>
				
        `);

				let contentHtml = '<h2>Products</h2>';
				contentHtml += '<table class="table table-striped"><thead><tr><th>Product Type</th><th>Model</th><th>Brand</th><th>Price</th><th>Processor</th><th>RAM</th><th>Hard Drive</th><th>Thumbnail URL</th><th>Actions</th></tr></thead><tbody>';
				data.forEach(function(laptop) {
					contentHtml += `<tr><td>${laptop.prodtype}</td><td>${laptop.model}</td><td>${laptop.brand}</td><td>$${laptop.price}</td><td>${laptop.processor}</td><td>${laptop.ram}</td><td>${laptop.harddrive}</td><td>${laptop.thumbnail_url}</td><td><button class="btn btn-primary" onclick="showEditModal(${laptop.id})">Edit</button><button class="btn btn-danger" onclick="deleteProduct(${laptop.id})">Delete</button></td></tr>`;
				});
				contentHtml += '</tbody></table><button class="btn btn-success" data-toggle="modal" data-target="#addProductModal">Add New Laptop </button>';
				$('#main-content').append(contentHtml);
				$('#totalLaptops').text(data.length);
			},
			error: function() {
				$('#main-content').html('<h2>Error loading products.</h2>');
				$('#totalLaptops').text('Error'); // Show error if there is a problem fetching data
			}
		});
	}


	window.logIn = function() {
		const username = prompt("Enter username:");
		const password = prompt("Enter password:");
		if (username === "admin" && password === "admin") {
			sessionStorage.setItem('isLoggedIn', true);
			showAdminDashboard();
		} else {
			alert('Incorrect username or password.');
		}
	};

	window.logOut = function() {
		sessionStorage.removeItem('isLoggedIn');
		navigateToSection('home');
		alert('You have been logged out.');
	};

	function loadContactForm() {
		let contactHtml = `
			<h2>Contact Us</h2>
			<form id="fs-frm" name="simple-contact-form" accept-charset="utf-8" action="https://formspree.io/f/mnqelebb" method="post">
  				<fieldset id="fs-frm-inputs">
			    <label for="full-name">Full Name</label>
			    <input type="text" name="name" id="full-name" placeholder="First and Last" required="">
			    <label for="email-address">Email Address</label>
			    <input type="email" name="_replyto" id="email-address" placeholder="email@tus.ie" required="">
			    <label for="message">Message</label>
			    <textarea rows="3" name="message" id="message" placeholder="Type your message you want to convey to us, here." required=""></textarea>
			    <input type="hidden" name="_subject" id="email-subject" value="Contact Form Submission">
			  </fieldset>
			  <input type="submit" value="Submit">
</form><style>/* reset */
#fs-frm input,
#fs-frm select,
#fs-frm textarea,
#fs-frm fieldset,
#fs-frm optgroup,
#fs-frm label,
#fs-frm #card-element:disabled {
  font-family: inherit;
  font-size: 100%;
  color: inherit;
  border: none;
  border-radius: 0;
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
}
#fs-frm label,
#fs-frm legend,
#fs-frm ::placeholder {
  font-size: .825rem;
  margin-bottom: .5rem;
  padding-top: .2rem;
  display: flex;
  align-items: baseline;
}

/* border, padding, margin, width */
#fs-frm input,
#fs-frm select,
#fs-frm textarea,
#fs-frm #card-element {
  border: 1px solid rgba(0,0,0,0.2);
  background-color: rgba(255,255,255,0.9);
  padding: .75em 1rem;
  margin-bottom: 1.5rem;
}
#fs-frm input:focus,
#fs-frm select:focus,
#fs-frm textarea:focus {
  background-color: white;
  outline-style: solid;
  outline-width: thin;
  outline-color: gray;
  outline-offset: -1px;
}
#fs-frm [type="text"],
#fs-frm [type="email"] {
  width: 100%;
}
#fs-frm [type="button"],
#fs-frm [type="submit"],
#fs-frm [type="reset"] {
  width: auto;
  cursor: pointer;
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
}
#fs-frm [type="button"]:focus,
#fs-frm [type="submit"]:focus,
#fs-frm [type="reset"]:focus {
  outline: none;
}
#fs-frm [type="submit"],
#fs-frm [type="reset"] {
  margin-bottom: 0;
}
#fs-frm select {
  text-transform: none;
}

#fs-frm [type="checkbox"] {
  -webkit-appearance: checkbox;
  -moz-appearance: checkbox;
  appearance: checkbox;
  display: inline-block;
  width: auto;
  margin: 0 .5em 0 0 !important;
}

#fs-frm [type="radio"] {
  -webkit-appearance: radio;
  -moz-appearance: radio;
  appearance: radio;
}

/* address, locale */
#fs-frm fieldset.locale input[name="city"],
#fs-frm fieldset.locale select[name="state"],
#fs-frm fieldset.locale input[name="postal-code"] {
  display: inline;
}
#fs-frm fieldset.locale input[name="city"] {
  width: 52%;
}
#fs-frm fieldset.locale select[name="state"],
#fs-frm fieldset.locale input[name="postal-code"] {
  width: 20%;
}
#fs-frm fieldset.locale input[name="city"],
#fs-frm fieldset.locale select[name="state"] {
  margin-right: 3%;
}
</style>

        `;
		$('#main-content').html(contactHtml);


		//
		//		$('#contactForm').submit(function(e) {
		//    e.preventDefault(); // Prevent default form submission
		//
		//    var formData = {
		//        'name': $('#name').val(),
		//        'email': $('#email').val(),
		//        'message': $('#message').val()
		//    };
		//
		//    $.ajax({
		//        type: 'POST',
		//        url: 'https://script.google.com/macros/s/AKfycbxZI0mSKS64TuaCvb53uwmWTUU1KuLXJyAK6sBS8-CPzcdghobLo_pKgIqzl_w-pO3xKQ/exec', // Googel App endpoint URL
		//        data: formData,
		//        success: function(response) {
		//            console.log(response);
		//            alert('Form submitted successfully!');
		//            $('#contactForm').trigger("reset"); // reset form after submission
		//        },
		//        error: function() {
		//            alert('Error submitting form');
		//        }
		//    });
		//});


	}





	//	function sendContactForm() {
	//		const formData = {
	//			name: $('#name').val(),
	//			email: $('#email').val(),
	//			message: $('#message').val()
	//		};
	//
	//		// Simulated sending process (add actual AJAX call here)
	//		console.log('Sending contact form:', formData);
	//		alert('Thank you for your message, ' + formData.name + '!');
	//		$('#main-content').html('<h2>Message Received</h2><p>We will contact you soon.</p>');
	//	}
});

// Function to display the Bootstrap modal for editing a product
function showEditModal(id) {
	const apiUrl = '/Laptop_Store_Web_Project/api/laptops/' + id;

	// Remove existing modals first to avoid duplicates
	$('#editModal').remove();

	// Fetch the product details from the server
	$.ajax({
		url: apiUrl,
		type: 'GET',
		success: function(laptop) {
			var modalHtml = '<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">';
			modalHtml += '<div class="modal-dialog" role="document">';
			modalHtml += '<div class="modal-content">';
			modalHtml += '<div class="modal-header">';
			modalHtml += '<h5 class="modal-title" id="editModalLabel">Edit Laptop</h5>';
			modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
			modalHtml += '<span aria-hidden="true">&times;</span></button></div>';
			modalHtml += '<div class="modal-body">';
			modalHtml += `<form>
                          <div class="form-group">
                            <label>Product Type</label>
                            <input type="text" class="form-control" name="prodtype" value="${laptop.prodtype}">
                          </div>
                          <div class="form-group">
                            <label>Model</label>
                            <input type="text" class="form-control" name="model" value="${laptop.model}">
                          </div>
                          <div class="form-group">
                            <label>Brand</label>
                            <input type="text" class="form-control" name="brand" value="${laptop.brand}">
                          </div>
                          <div class="form-group">
                            <label>Price</label>
                            <input type="number" class="form-control" name="price" value="${laptop.price}">
                          </div>
                          <div class="form-group">
                            <label>Processor</label>
                            <input type="text" class="form-control" name="processor" value="${laptop.processor}">
                          </div>
                          <div class="form-group">
                            <label>RAM</label>
                            <input type="text" class="form-control" name="ram" value="${laptop.ram}">
                          </div>
                          <div class="form-group">
                            <label>Hard Drive</label>
                            <input type="text" class="form-control" name="harddrive" value="${laptop.harddrive}">
                          </div>
                          <div class="form-group">
                            <label>Pic URL</label>
                            <input type="text" class="form-control" name="thumbnail_url" value="${laptop.thumbnail_url}">
                          </div>
                        </form>`;
			modalHtml += '</div>';
			modalHtml += '<div class="modal-footer">';
			modalHtml += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>';
			modalHtml += `<button type="button" class="btn btn-primary" onclick="saveProduct(${id})">Save changes</button>`;
			modalHtml += '</div></div></div></div>';

			$('body').append(modalHtml); // Append the new modal HTML to body
			$('#editModal').modal('show'); // Show the new modal
		},
		error: function() {
			alert('Error fetching product details.');
		}
	});
}



// Function to save the product after editing
function saveProduct(id) {
	const apiUrl = '/Laptop_Store_Web_Project/api/laptops';
	var laptop = {
		prodtype: $('#editModal input[name="prodtype"]').val(),
		model: $('#editModal input[name="model"]').val(),
		brand: $('#editModal input[name="brand"]').val(),
		price: $('#editModal input[name="price"]').val(),
		processor: $('#editModal input[name="processor"]').val(),
		ram: $('#editModal input[name="ram"]').val(),
		harddrive: $('#editModal input[name="harddrive"]').val(),
		thumbnail_url: $('#editModal input[name="thumbnail_url"]').val()
	};

	$.ajax({
		url: apiUrl + '/' + id,
		type: 'PUT',
		contentType: 'application/json',
		data: JSON.stringify(laptop),
		success: function() {
			$('#editModal').modal('hide');
			loadProductsAdmin();
		},
		error: function() {
			alert('Error updating product.');
		}
	});
}

$(document).ready(function() {
	$('body').on('click', '.edit-btn', function() {
		var id = $(this).data('id');
		showEditModal(id);
	});

	$('body').on('click', '.save-btn', function() {
		var id = $(this).data('id');
		saveProduct(id);
	});
});



function loadProductsAdmin() {
	$.ajax({
		url: '/Laptop_Store_Web_Project/api/laptops',
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			$('#main-content').html('<h2>Welcome to the Admin Dashboard</h2>');
			$('#main-content').append(`
            <div class="card-deck mb-3 text-center">
                <div class="card mb-4 shadow-sm">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-normal">Total Laptops</h4>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title" id="totalLaptops">Loading...</h1>
                        <small class="text-muted">in stock</small>
                    </div>
                </div>
                <div class="card mb-4 shadow-sm">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-normal">Laptops Sold</h4>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">1540</h1>
                        <small class="text-muted">units sold</small>
                    </div>
                </div>
                <div class="card mb-4 shadow-sm">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-normal">Sales Target</h4>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">10000</h1>
                        <small class="text-muted">target for the year</small>
                    </div>
                </div>
            </div>
        `);

			let contentHtml = '<h2>Products</h2>';
			contentHtml += '<table class="table"><thead><tr><th>Product Type</th><th>Model</th><th>Brand</th><th>Price</th><th>Processor</th><th>RAM</th><th>Hard Drive</th><th>Thumbnail URL</th><th>Actions</th></tr></thead><tbody>';
			data.forEach(function(laptop) {
				contentHtml += `<tr><td>${laptop.prodtype}</td><td>${laptop.model}</td><td>${laptop.brand}</td><td>$${laptop.price}</td><td>${laptop.processor}</td><td>${laptop.ram}</td><td>${laptop.harddrive}</td><td>${laptop.thumbnail_url}</td><td><button class="btn btn-primary" onclick="showEditModal(${laptop.id})">Edit</button><button class="btn btn-danger" onclick="deleteProduct(${laptop.id})">Delete</button></td></tr>`;
			});
			contentHtml += '</tbody></table><button class="btn btn-success" data-toggle="modal" data-target="#addProductModal">Add New Laptop </button>';
			$('#main-content').append(contentHtml);
			$('#totalLaptops').text(data.length);
		},
		error: function() {
			$('#main-content').html('<h2>Error loading products.</h2>');
			$('#totalLaptops').text('Error'); // Show error if there is a problem fetching data
		}
	});
}



function filterProducts() {
	var searchText = $('#searchBox').val().toLowerCase();
	$('.product-card').each(function() {
		var brand = $(this).data('brand');
		var model = $(this).data('model');
		if (brand.includes(searchText) || model.includes(searchText)) {
			$(this).show();
		} else {
			$(this).hide();
		}
	});
}

function addProduct() {
	const apiUrl = '/Laptop_Store_Web_Project/api/laptops';
	var laptop = {
		prodtype: $('#prodtype').val(),
		model: $('#model').val(),
		brand: $('#brand').val(),
		price: $('#price').val(),
		processor: $('#processor').val(),
		ram: $('#ram').val(),
		harddrive: $('#harddrive').val(),
		thumbnail_url: $('#thumbnail_url').val()
	};

	$.ajax({
		url: apiUrl,
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(laptop),
		success: function() {
			$('#addProductModal').modal('hide'); // Hide the modal
			loadProductsAdmin(); // Reload the list of products
		},
		error: function() {
			alert('Error adding product.');
		}
	});
}


