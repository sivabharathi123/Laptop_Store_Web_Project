package com.ait.laptops;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Laptop {
	
		private int id;

		private String prodtype;
	    
	    private String model;
	    
	    private String brand;

	    private double price;
	    
	    private String processor;
	    
	    private String ram;
	    
	    private String harddrive;
	    
	    private String thumbnail_url;

		public String getThumbnail_url() {
			return thumbnail_url;
		}

		public void setThumbnail_url(String thumbnail_url) {
			this.thumbnail_url = thumbnail_url;
		}

		public String getModel() {
			return model;
		}

		public void setModel(String model) {
			this.model = model;
		}

		public String getBrand() {
			return brand;
		}

		public void setBrand(String brand) {
			this.brand = brand;
		}
		
		
		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getProdtype() {
			return prodtype;
		}

		public void setProdtype(String prodtype) {
			this.prodtype = prodtype;
		}

		public double getPrice() {
			return price;
		}

		public void setPrice(double price) {
			this.price = price;
		}

		public String getProcessor() {
			return processor;
		}

		public void setProcessor(String processor) {
			this.processor = processor;
		}

		public String getRam() {
			return ram;
		}

		public void setRam(String ram) {
			this.ram = ram;
		}

		public String getHarddrive() {
			return harddrive;
		}

		public void setHarddrive(String harddrive) {
			this.harddrive = harddrive;
		}

}
