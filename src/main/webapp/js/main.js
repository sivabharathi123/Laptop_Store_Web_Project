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
            let contentHtml = '<h2>Products</h2><div class="row">'; // Start of Bootstrap row
            data.forEach(function(laptop) {
                contentHtml += `
                    <div class="col-md-3">
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
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
                                    </div>
                                </div>
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
                let contentHtml = '<h2>Products</h2><div class="products-container">';
                data.forEach(function(laptop) {
                    contentHtml += `
                        <div class="product">
                            <h3>${laptop.prodtype}</h3>
                            <p>Model: ${laptop.model}</p>
                            <p>Brand: ${laptop.brand}</p>
                            <p>Procesor: ${laptop.processor}</p>
                            <p>Ram: ${laptop.ram}</p>
                            <p>Hard Drive: ${laptop.harddrive}</p>
                            <p>Price: ${laptop.price}</p>
                            <p>Picture: ${laptop.thumbnail_url}</p>
                            <button onclick="editProduct(${laptop.id})">Edit</button>
                            <button onclick="deleteProduct(${laptop.id})">Delete</button>

                        </div>`;
                });
                contentHtml += '</div><button onclick="addProduct()">Add New Laptop</button>';
                $('#main-content').html(contentHtml);
            },
            error: function() {
                $('#main-content').html('<h2>Error loading products.</h2>');
            }
        });
    }

    window.addProduct = function() {
        const laptop = {
            prodtype: prompt("Enter laptop Product Type:"),
            model: prompt("Enter laptop model:"),
            brand: prompt("Enter laptop brand:"),
            price: prompt("Enter laptop price:"),
            processor: prompt("Enter laptop processor:"),
            ram: prompt("Enter laptop ram:"),
            harddrive: prompt("Enter laptop harddrive:"),
            thumbnail_url: prompt("Enter laptop picture's url:")
        };

        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(laptop),
            success: function() {
                loadProductsAdmin();
            },
            error: function() {
                alert('Error adding product.');
            }
        });
    };

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


