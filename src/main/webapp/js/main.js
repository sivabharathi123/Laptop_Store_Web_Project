$(function() {
	const apiUrl = '/Laptop_Store_Web_Project/api/laptops';

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
			case 'home':
				$('#main-content').html('<h2>Welcome to Our Laptop Store</h2>');
				break;
			default:
				$('#main-content').html('<h2>Error: Section not found.</h2>');
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

////old code before search
//	function loadProducts() {
//		$.ajax({
//			url: apiUrl,
//			type: 'GET',
//			dataType: 'json',
//			success: function(data) {
//				let contentHtml = '<h2>Products</h2><div class="row">'; // Start of Bootstrap row
//				data.forEach(function(laptop) {
//					contentHtml += `
//                    <div class="col-md-3">
//                        <div class="card mb-4 box-shadow">
//                            <img class="card-img-top" src="${laptop.thumbnail_url}" alt="Laptop image" style="height: 225px; width: 100%; display: block;">
//                            <div class="card-body">
//                                <p class="card-text">${laptop.prodtype}</p>
//                                <p class="card-text">Model: ${laptop.model}</p>
//                                <p class="card-text">Brand: ${laptop.brand}</p>
//                                <p class="card-text">Processor: ${laptop.processor}</p>
//                                <p class="card-text">RAM: ${laptop.ram}</p>
//                                <p class="card-text">Hard Drive: ${laptop.harddrive}</p>
//                                <p class="card-text">Price: $${laptop.price}</p>
//                            </div>
//                        </div>
//                    </div>`;
//				});
//				contentHtml += '</div>'; // End of Bootstrap row
//				$('#main-content').html(contentHtml);
//			},
//			error: function() {
//				$('#main-content').html('<h2>Error loading products.</h2>');
//			}
//		});
//	}

	//
	//    function loadProducts() {
	//        $.ajax({
	//            url: apiUrl,
	//            type: 'GET',
	//            dataType: 'json',
	//            success: function(data) {
	//                let contentHtml = '<h2>Products</h2><div class="products-container">';
	//                data.forEach(function(laptop) {
	//                    contentHtml += `
	//                        <div class="product">
	//                            <h3>${laptop.prodtype}</h3>
	//                            <p>Model: ${laptop.model}</p>
	//                            <p>Brand: ${laptop.brand}</p>
	//                            <p>Procesor: ${laptop.processor}</p>
	//                            <p>Ram: ${laptop.ram}</p>
	//                            <p>Hard Drive: ${laptop.harddrive}</p>
	//                            <p>Price: ${laptop.price}</p>
	//                            <p>Picture: ${laptop.thumbnail_url}</p>
	//                        </div>`;
	//                });
	//
	//                $('#main-content').html(contentHtml);
	//            },
	//            error: function() {
	//                $('#main-content').html('<h2>Error loading products.</h2>');
	//            }
	//        });
	//    }


	function loadProductsAdmin() {
		$.ajax({
			url: apiUrl,
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				let contentHtml = '<h2>Products Dashboard</h2>';
				contentHtml += '<div>Total Laptops: ' + data.length + '</div>'; // Dummy summary
				contentHtml += '<table class="table table-hover"><thead><tr>';
				contentHtml += '<th>Product Type</th><th>Model</th><th>Brand</th><th>Price</th><th>Processor</th><th>RAM</th><th>Hard Drive</th><th>Pic URL</th><th>Actions</th></tr></thead><tbody>';
				data.forEach(function(laptop) {
					contentHtml += `<tr>
                                    <td>${laptop.prodtype}</td>
                                    <td>${laptop.model}</td>
                                    <td>${laptop.brand}</td>
                                    <td>$${laptop.price}</td>
                                    <td>${laptop.processor}</td>
                                    <td>${laptop.ram}</td>
                                    <td>${laptop.harddrive}</td>
                                    <td>${laptop.thumbnail_url}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary edit-btn" data-id="${laptop.id}">Edit</button>
                                        <button class="btn btn-danger" onclick="deleteProduct(${laptop.id})">Delete</button>
                                        
                                    </td>
                                </tr>`;
				});
				contentHtml += '</tbody></table><button class="btn btn-success" data-toggle="modal" data-target="#addProductModal">Add New Laptop </button>';
				$('#main-content').html(contentHtml);
				setupAddProductModal();
			},
			error: function() {
				$('#main-content').html('<h2>Error loading products.</h2>');
			}
		});
	}


	//
	//
	//	function loadProductsAdmin() {
	//    $.ajax({
	//        url: apiUrl,
	//        type: 'GET',
	//        dataType: 'json',
	//        success: function(data) {
	//            let contentHtml = '<h2>Products</h2><div class="row">'; // Start of Bootstrap row
	//            data.forEach(function(laptop) {
	//                contentHtml += `
	//                    <div class="col-md-3">
	//                        <div class="card mb-4 box-shadow">
	//                            <img class="card-img-top" src="${laptop.thumbnail_url}" alt="Laptop image" style="height: 225px; width: 100%; display: block;">
	//                            <div class="card-body">
	//                                <p class="card-text">${laptop.prodtype}</p>
	//                                <p class="card-text">Model: ${laptop.model}</p>
	//                                <p class="card-text">Brand: ${laptop.brand}</p>
	//                                <p class="card-text">Processor: ${laptop.processor}</p>
	//                                <p class="card-text">RAM: ${laptop.ram}</p>
	//                                <p class="card-text">Hard Drive: ${laptop.harddrive}</p>
	//                                <p class="card-text">Price: $${laptop.price}</p>
	//                                <div class="d-flex justify-content-between align-items-center">
	//                                    <div class="btn-group">
	//                                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="editProduct(${laptop.id})">Edit</button>
	//                                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="deleteProduct(${laptop.id})">Delete</button>
	//                                    </div>
	//                                </div>
	//                            </div>
	//                        </div>
	//                    </div>`;
	//            });
	//            contentHtml += '</div><button type="button" class="btn btn-sm btn-outline-secondary" onclick="addProduct()">Add New Laptop</button>'; // End of Bootstrap row
	//            $('#main-content').html(contentHtml);
	//        },
	//        error: function() {
	//            $('#main-content').html('<h2>Error loading products.</h2>');
	//        }
	//    });
	//}
	//

	//
	//function loadProductsAdmin() {
	//        $.ajax({
	//            url: apiUrl,
	//            type: 'GET',
	//            dataType: 'json',
	//            success: function(data) {
	//                let contentHtml = '<h2>Products</h2><div class="products-container">';
	//                data.forEach(function(laptop) {
	//                    contentHtml += `
	//                        <div class="product">
	//                            <h3>${laptop.prodtype}</h3>
	//                            <p>Model: ${laptop.model}</p>
	//                            <p>Brand: ${laptop.brand}</p>
	//                            <p>Procesor: ${laptop.processor}</p>
	//                            <p>Ram: ${laptop.ram}</p>
	//                            <p>Hard Drive: ${laptop.harddrive}</p>
	//                            <p>Price: ${laptop.price}</p>
	//                            <p>Picture: ${laptop.thumbnail_url}</p>
	//                            <button onclick="editProduct(${laptop.id})">Edit</button>
	//                            <button onclick="deleteProduct(${laptop.id})">Delete</button>
	//
	//                        </div>`;
	//                });
	//                contentHtml += '</div><button onclick="addProduct()">Add New Laptop</button>';
	//                $('#main-content').html(contentHtml);
	//            },
	//            error: function() {
	//                $('#main-content').html('<h2>Error loading products.</h2>');
	//            }
	//        });
	//    }

//	window.addProduct = function() {
//		const laptop = {
//			prodtype: prompt("Enter laptop Product Type:"),
//			model: prompt("Enter laptop model:"),
//			brand: prompt("Enter laptop brand:"),
//			price: prompt("Enter laptop price:"),
//			processor: prompt("Enter laptop processor:"),
//			ram: prompt("Enter laptop ram:"),
//			harddrive: prompt("Enter laptop harddrive:"),
//			thumbnail_url: prompt("Enter laptop picture's url:")
//		};
//
//		$.ajax({
//			url: apiUrl,
//			type: 'POST',
//			contentType: 'application/json',
//			data: JSON.stringify(laptop),
//			success: function() {
//				loadProductsAdmin();
//			},
//			error: function() {
//				alert('Error adding product.');
//			}
//		});
//	};

	window.editProduct = function(id) {
		const laptop = {
			prodtype: prompt("Enter laptop's new Product Type:"),
			model: prompt("Enter laptop's new model:"),
			brand: prompt("Enter laptop's new brand:"),
			price: Number(prompt("Enter laptop's new price:")),
			processor: prompt("Enter laptop's new processor:"),
			ram: prompt("Enter laptop's new ram:"),
			harddrive: prompt("Enter laptop's new harddrive:"),
			thumbnail_url: prompt("Enter laptop's new picture's url:")

		};

		$.ajax({
			url: apiUrl + '/' + id,
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify(laptop),
			success: function() {
				loadProductsAdmin();
			},
			error: function() {
				alert('Error updating product.');
			}
		});
	};

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
                <h2>Admin Dashboard</h2>
                <p>You must log in to view this section.</p>
                <button onclick="logIn()">Log In</button>
            `);
		} else {
			$('#main-content').html('<h2>Admin Dashboard</h2><p>Manage your products here.</p>');
			loadProductsAdmin();
		}
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
            <form id="contactForm">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br>
                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea><br>
                <button type="submit">Send</button>
            </form>
        `;
		$('#main-content').html(contactHtml);

		$('#contactForm').submit(function(e) {
			e.preventDefault();
			sendContactForm();
		});
	}

	function sendContactForm() {
		const formData = {
			name: $('#name').val(),
			email: $('#email').val(),
			message: $('#message').val()
		};

		// Simulated sending process (add actual AJAX call here)
		console.log('Sending contact form:', formData);
		alert('Thank you for your message, ' + formData.name + '!');
		$('#main-content').html('<h2>Message Received</h2><p>We will contact you soon.</p>');
	}
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

	//    window.editProduct = function(id) {
//	function showEditModal(id) {
//		const apiUrl = '/Laptop_Store_Web_Project/api/laptops';
//		// Fetch the product details from the server or from a local data structure
//		$.ajax({
//			url: apiUrl + '/' + id,
//			type: 'GET',
//			success: function(laptop) {
//				var modalHtml = '<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">';
//				modalHtml += '<div class="modal-dialog" role="document">';
//				modalHtml += '<div class="modal-content">';
//				modalHtml += '<div class="modal-header">';
//				modalHtml += '<h5 class="modal-title" id="editModalLabel">Edit Laptop</h5>';
//				modalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
//				modalHtml += '<span aria-hidden="true">&times;</span></button></div>';
//				modalHtml += '<div class="modal-body">';
//				modalHtml += `<form>
//                          <div class="form-group">
//                            <label>Product Type</label>
//                            <input type="text" class="form-control" value="${laptop.prodtype}">
//                          </div>
//                          <div class="form-group">
//                            <label>Model</label>
//                            <input type="text" class="form-control" value="${laptop.model}">
//                          </div>
//                          <div class="form-group">
//                            <label>Brand</label>
//                            <input type="text" class="form-control" value="${laptop.brand}">
//                          </div>
//                          <div class="form-group">
//                            <label>Price</label>
//                            <input type="number" class="form-control" value="${laptop.price}">
//                          </div>
//                          <div class="form-group">
//                            <label>Processor</label>
//                            <input type="text" class="form-control" value="${laptop.processor}">
//                          </div>
//                          <div class="form-group">
//                            <label>RAM</label>
//                            <input type="text" class="form-control" value="${laptop.ram}">
//                          </div>
//                          <div class="form-group">
//                            <label>Hard Drive</label>
//                            <input type="text" class="form-control" value="${laptop.harddrive}">
//                          </div>
//                        </form>`;
//				modalHtml += '</div>';
//				modalHtml += '<div class="modal-footer">';
//				modalHtml += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>';
//				modalHtml += `<button type="button" class="btn btn-primary" onclick="saveProduct(${id})">Save changes</button>`;
//				modalHtml += '</div></div></div></div>';
//
//				$('#main-content').append(modalHtml);
//				$('#editModal').modal('show');
//			},
//			error: function() {
//				alert('Error fetching product details.');
//			}
//		});
//	}
	

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

$(document).ready(function() {
    console.log(typeof $.fn.modal);  // This should log 'function' if Bootstrap is loaded correctly
});

	function loadProductsAdmin() {
	const apiUrl = '/Laptop_Store_Web_Project/api/laptops';
		$.ajax({
			url: apiUrl,
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				let contentHtml = '<h2>Products Dashboard</h2>';
				contentHtml += '<div>Total Laptops: ' + data.length + '</div>'; // Dummy summary
				contentHtml += '<table class="table table-hover"><thead><tr>';
				contentHtml += '<th>Product Type</th><th>Model</th><th>Brand</th><th>Price</th><th>Processor</th><th>RAM</th><th>Hard Drive</th><th>Actions</th></tr></thead><tbody>';
				data.forEach(function(laptop) {
					contentHtml += `<tr>
                                    <td>${laptop.prodtype}</td>
                                    <td>${laptop.model}</td>
                                    <td>${laptop.brand}</td>
                                    <td>$${laptop.price}</td>
                                    <td>${laptop.processor}</td>
                                    <td>${laptop.ram}</td>
                                    <td>${laptop.harddrive}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary edit-btn" data-id="${laptop.id}">Edit</button>
                                        <button class="btn btn-danger" onclick="deleteProduct(${laptop.id})">Delete</button>
                                        
                                    </td>
                                </tr>`;
				});
				contentHtml += '</tbody></table>';
				$('#main-content').html(contentHtml);
			},
			error: function() {
				$('#main-content').html('<h2>Error loading products.</h2>');
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



//                                <div class="d-flex justify-content-between align-items-center">
//                                    <div class="btn-group">
//                                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
//                                        <button type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
//                                    </div>
//                                </div>

//                                        <button class="btn btn-primary" onclick="showEditModal(${laptop.id})">Edit</button>
//                                        <button class="btn btn-danger" onclick="deleteProduct(${laptop.id})">Delete</button>