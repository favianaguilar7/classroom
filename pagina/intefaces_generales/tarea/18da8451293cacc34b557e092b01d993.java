
public class Paciente {
    private String id;
    private String nombre;
    public boolean voluntad;
    public int edad;
    private Familiar familiar;
    
    // Constructor
    public Paciente(String id, String nombre,int edad) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
      
    }
    
    // Getters y Setters
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
     
    public int getEdad() {
        return edad;
    }
    
    public void setEdad(int edad) {
        this.edad = edad;
    }
    
    
    @Override
	public String toString(){
		return "Id: " + this.id + " Nombre: " + this.nombre
					+ " Edad: " + this.edad;

	}
    
}