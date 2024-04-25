package com.ait.laptops;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.ait.dao.LaptopDAO;

@Path("/laptops")
public class LaptopResource {
	
	LaptopDAO dao = new LaptopDAO();
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Laptop> findAll() {
		return dao.findAll();
	}
	
	@GET @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Laptop findById(@PathParam("id") String id) {
		return dao.findById(Integer.parseInt(id));
	}
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response addLaptop(Laptop laptop) {
	    LaptopDAO.addLaptop(laptop.getProdtype(), laptop.getModel(), laptop.getBrand(), laptop.getPrice(), laptop.getProcessor(), laptop.getRam(), laptop.getHarddrive(), laptop.getThumbnail_url());
	    System.out.println(laptop);
	    return Response.status(Response.Status.CREATED).build();
	}
	
	@DELETE @Path("{id}")
	public Response deleteLaptop(@PathParam("id") int id) {
	    dao.deleteLaptop(id);
	    return Response.ok().build();
	}

	@PUT @Path("/{id}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response updateLaptop(@PathParam("id") int id, Laptop laptop) {
	    dao.updateLaptop(id, laptop);
	    return Response.ok().build();
	}

}