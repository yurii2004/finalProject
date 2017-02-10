package com.finalproject.restservice;

import com.finalproject.dao.Good;
import com.finalproject.dao.GoodsDao;
import com.finalproject.dbuserdao.DbUser;
import com.finalproject.dbuserdao.DbuserDao;
import com.finalproject.orderdao.Orders;
import com.finalproject.orderdao.OrdersDao;
import com.finalproject.profilesdao.Profiles;
import com.finalproject.profilesdao.ProfilesDao;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Res class - the result of recive and response users information
 *
 * @author YuriiBel
 */
@XmlRootElement
class Res {

    @XmlElement
    String firstName;
    @XmlElement
    String lastName;
    @XmlElement
    String adress;
    @XmlElement
    Integer telephoneNumber;
    @XmlElement
    String login;
    @XmlElement
    String emailPassword;
}

/**
 * StringAnswer class for sending and receiving status information
 *
 * @author YuriiBel
 */
@XmlRootElement
class StringAnswer {

    StringAnswer(String text) {
        this.text = text;
    }
    @XmlElement
    String text;
}

/**
 * NewUser class for receiving users login
 *
 * @author YuriiBel
 */
@XmlRootElement
class NewUser {

    @XmlElement
    String param;
}

/**
 * UserInfoAnswer class for sending users authorization information
 *
 * @author YuriiBel
 */
@XmlRootElement
class UserInfoAnswer {

    UserInfoAnswer(String id, String password) {
        this.id = id;
        this.password = password;
    }
    @XmlElement
    String password;
    @XmlElement
    String id;
}

/**
 * RestService class - consists methods for processing client requests
 *
 * @author YuriiBel
 */
@Path("/UserService")
public class RestService {
    private static final org.apache.log4j.Logger SLOG
            = org.apache.log4j.Logger.getLogger("stdout");
    private static final org.apache.log4j.Logger ERLOG
            = org.apache.log4j.Logger.getLogger("error");
    
    // objects for database connections
    GoodsDao gd = new GoodsDao();
    OrdersDao od = new OrdersDao();
    DbuserDao dbd = new DbuserDao();
    ProfilesDao pd = new ProfilesDao();

    @GET
    @Path("/allGoods")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Good> getGoods() throws ClassNotFoundException {
        SLOG.info("getGoods rest");
        return gd.getAllGoods();
    }

    /**
     * Method check users authorization
     *
     * @param u
     * @return user authorixation information
     * @throws ClassNotFoundException
     */
    @POST
    @Path("/authorize")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public UserInfoAnswer getUsersAuth(NewUser u) throws ClassNotFoundException {
        UserInfoAnswer ans = null;
        SLOG.info("getUsersAuth rest");
        try {
            String query = "Select * from dbuser where login = \'"
                    + u.param + "\'";
            DbUser user = dbd.getUserByLogin(u.param);
            ans = new UserInfoAnswer(user.getId().toString(), user.getPassword());
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
            return ans;
        } catch (NullPointerException ex) {
            System.out.println("Null pointer exception");
            ex.printStackTrace();
        }
        return ans;
    }

    /**
     * Method for registering new user
     *
     * @param r
     * @return text status
     * @throws IOException
     * @throws ClassNotFoundException
     */
    @POST
    @Path("/registr")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes({MediaType.APPLICATION_JSON})
    public StringAnswer registrUser(Res r) throws IOException, 
        ClassNotFoundException {
        SLOG.info("registrUser rest");
        String userPassword = "";
        StringAnswer ans = null;
        try {
            String requestAnswer = dbd.ifUserExists(r.login);
            if (requestAnswer.equals("exists")) {
                ans = new StringAnswer("there is a user");
            } else {
                DbUser newUser = new DbUser(r.login, r.emailPassword, 0);
                dbd.addUser(newUser);
                DbUser user = dbd.getUserByLogin(r.login);
                Profiles newProfile = new Profiles(user.getId(), r.firstName,
                        r.lastName, r.adress, r.telephoneNumber.toString());
                pd.addProfile(newProfile);
                ans = new StringAnswer(user.getId().toString());
            }
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
            ans = new StringAnswer("erro while add profile");
        }
        return ans;
    }

    /**
     * Method for geting users information
     *
     * @param u
     * @return users information
     * @throws IOException
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    @POST
    @Path("/getProfile")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Res getUsersProfile(NewUser u) throws IOException, SQLException,
            ClassNotFoundException {
        SLOG.info("getUsersProfile rest");
        Res r = null;
        try {
            r = new Res();
            DbUser user = dbd.getUserById(u.param);
            r.login = user.getLogin();
            r.emailPassword = user.getPassword();
            Profiles prof = pd.getProfileById(u.param);
            r.firstName = prof.getFirstName();
            r.lastName = prof.getLastName();
            r.adress = prof.getAdress();
            r.telephoneNumber = Integer.valueOf(prof.getTelephoneNumber());
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
            return r;
        }
        return r;
    }

    /**
     * Method for getting information about users profile
     *
     * @param r
     * @return users profile information
     * @throws IOException
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    @POST
    @Path("/setProfile")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Res setUsersProfile(Res r) throws IOException, SQLException,
            ClassNotFoundException {
        SLOG.info("setUsersProfile rest");
        StringAnswer ans = null;
        try {
            DbUser user = dbd.getUserByLogin(r.login);
            Profiles prof = new Profiles(user.getId(), r.firstName, r.lastName,
                    r.adress, r.telephoneNumber.toString());
            pd.setProfile(prof);
            user = new DbUser(r.login, r.emailPassword, 0);
            dbd.updateUser(user);
        } catch (SQLException e) {
            System.out.println("Connection Failed! Check output console");
            e.printStackTrace();
        }
        return r;
    }

    /**
     * Method for decluding good availability
     *
     * @param recGood
     * @return text status
     * @throws ClassNotFoundException
     */
    @POST
    @Path("/addGoodToCart")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public StringAnswer addGood(Good recGood) throws ClassNotFoundException {
        SLOG.info("addGood rest");
        String answer = gd.addGood(recGood);
        StringAnswer out = new StringAnswer(answer);
        return out;
    }

    /**
     * Method for including good availability
     *
     * @param recGood
     * @return text status
     * @throws ClassNotFoundException
     */
    @POST
    @Path("/deleteGoodFromCart")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public StringAnswer deleteGood(NewUser u) throws ClassNotFoundException {
        SLOG.info("addGood rest");
        String answer = gd.deleteGoodById(u.param);
        StringAnswer out = new StringAnswer(answer);
        return out;
    }

    /**
     * Method for add orders list ot database
     *
     * @param orderList
     * @return text status
     * @throws ClassNotFoundException
     */
    @POST
    @Path("/fixCart")
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public StringAnswer addOrders(List<Orders> orderList)
            throws ClassNotFoundException {
        SLOG.info("addOrders rest");
        String answer = od.addListOfOrders(orderList);
        StringAnswer out = new StringAnswer(answer);
        return out;
    }
}
