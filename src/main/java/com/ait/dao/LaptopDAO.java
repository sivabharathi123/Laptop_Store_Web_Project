package com.ait.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.ait.laptops.ConnectionHelper;
import com.ait.laptops.Laptop;

public class LaptopDAO {


    
    public List<Laptop> findAll() {
        List<Laptop> laptops = new ArrayList<>();
        String sql = "SELECT * FROM laptops";
        try (Connection c = ConnectionHelper.getConnection();
             Statement s = c.createStatement();
             ResultSet rs = s.executeQuery(sql)) {
            while (rs.next()) {
                laptops.add(processRow(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return laptops;
    }
	// Commenting this code block to check other functions.
    public Laptop findById(int id) {
        String sql = "SELECT * FROM laptops WHERE id = ?";
        try (Connection c = ConnectionHelper.getConnection();
             PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return processRow(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return null;
    }

    /*
    public Laptop findByModel(String model) {
        String sql = "SELECT * FROM laptops WHERE UPPER(Model) LIKE ? ORDER BY Model";
        try (Connection c = ConnectionHelper.getConnection();
             PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setString(1, "%" + model.toUpperCase() + "%");
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return processRow(rs);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return null;
    }
    
    */


    public static void addLaptop(String prodtype, String model, String brand, double price, String processor, String ram, String harddrive, String thumbnail_url) {
        try (Connection conn = ConnectionHelper.getConnection()) {

        	String sql = "INSERT INTO laptops (prodtype, model, brand, price, processor, ram, harddrive, thumbnail_url) VALUES (?,?,?,?,?,?,?,?)";
            
        	try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, prodtype);
                stmt.setString(2, model);
                stmt.setString(3, brand);
                stmt.setDouble(4, price);
                stmt.setString(5, processor);
                stmt.setString(6, ram);
                stmt.setString(7, harddrive);
                stmt.setString(8, thumbnail_url);
                stmt.executeUpdate();
                System.out.println("laptop added successfully!");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } 
    }
    
    public void deleteLaptop(int id) {
        try (Connection conn = ConnectionHelper.getConnection()) {
            String sql = "DELETE FROM laptops WHERE id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setInt(1, id);
                stmt.executeUpdate();
                System.out.println("laptop deleted successfully!");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void updateLaptop(int id, Laptop laptop) {
        try (Connection conn = ConnectionHelper.getConnection()) {
        	String sql = "UPDATE laptops SET prodtype = ?, model = ?, brand = ?, price = ?, processor = ?, ram = ?, harddrive = ?, thumbnail_url = ? WHERE id = ?";
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, laptop.getProdtype());
                stmt.setString(2, laptop.getModel());
                stmt.setString(3, laptop.getBrand());
                stmt.setDouble(4, laptop.getPrice());
                stmt.setString(5, laptop.getProcessor());
                stmt.setString(6, laptop.getRam());
                stmt.setString(7, laptop.getHarddrive());
                stmt.setString(8, laptop.getThumbnail_url());
                stmt.setInt(9, id);
                stmt.executeUpdate();
                System.out.println("laptop updated successfully!");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private Laptop processRow(ResultSet rs) throws SQLException {
        Laptop laptop = new Laptop();
        laptop.setId(rs.getInt("id"));
        laptop.setProdtype(rs.getString("prodtype"));
        laptop.setModel(rs.getString("model"));
        laptop.setBrand(rs.getString("brand"));
        laptop.setPrice(rs.getDouble("price"));
        laptop.setProcessor(rs.getString("processor"));
        laptop.setRam(rs.getString("ram"));
        laptop.setHarddrive(rs.getString("harddrive"));
        laptop.setThumbnail_url(rs.getString("thumbnail_url"));
        return laptop;
    }
}
