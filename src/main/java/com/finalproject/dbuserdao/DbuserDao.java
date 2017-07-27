package com.finalproject.dbuserdao;

import com.finalproject.connector.DbConnector;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * DbuserDao class - consists methods for accessing and processing users
 * information
 * @author YuriiBel
 */
public class DbuserDao {
    DbConnector connector = null;
    private static final org.apache.log4j.Logger SLOG
            = org.apache.log4j.Logger.getLogger("stdout");
    private static final org.apache.log4j.Logger ERLOG
            = org.apache.log4j.Logger.getLogger("error");
    
    public DbuserDao() {
        this.connector = new DbConnector();
    }
    
    /**
     * Method which checks if the user exists
     * @param login
     * @return text status
     * @throws SQLException 
     */
    public String ifUserExists(String login) throws SQLException {
        SLOG.info("ifUserExists dbuser dao");
        String answer = "";
        String query = "Select * from dbuser where login = ?";
        
        PreparedStatement st = connector.getPreparedStatement(query);
        st.setString(1, login);
        ResultSet rs = st.executeQuery();

        if (rs.next()) {
            answer = "exists";
        }
        return answer;
    }
    
    /**
     * Method which adds new user in database
     * @param newUser
     * @throws SQLException 
     */
    public void addUser(DbUser newUser) throws SQLException {
        SLOG.info("addUser dbuser dao");
        String queryDBUser = "Insert Into dbuser (login,password) values (?,?)";
        PreparedStatement st = connector.getPreparedStatement(queryDBUser);
        st.setString(1, newUser.getLogin()); 
        st.setString(2, newUser.getPassword()); 
        st.executeUpdate();
        connector.closePreparedStatement(st);
    }
    
    /**
     * Method which gets users unformation from database by login value
     * @param login
     * @return DbUser's entity
     * @throws SQLException 
     */
    public DbUser getUserByLogin(String login) throws SQLException {
        SLOG.info("getUserByLogin dbuser dao");
        String query = "Select * from dbuser where login = ?";
        PreparedStatement st = connector.getPreparedStatement(query);
        st.setString(1, login);
        ResultSet rs = st.executeQuery();
        Integer userId = -1;
        if (rs.next()) {
           DbUser newUser = new DbUser(rs.getString("login"),
                   rs.getString("password"),rs.getInt("id"));

           userId = rs.getInt("id");
           connector.closePreparedStatement(st);
           return  newUser;
        }
        else {
            ERLOG.info("dbuser dao getUserByLogin: user is null");
            throw new NullPointerException();
        } 
    }
    
    /**
     * Method which gets users unformation from database by id value
     * @param id
     * @return
     * @throws SQLException 
     */
    public DbUser getUserById(String id) throws SQLException {
        SLOG.info("getUserById dbuser dao");
        String query = "Select * from dbuser where id = ?";
        PreparedStatement st = connector.getPreparedStatement(query);
        st.setString(1, id);
        ResultSet rs = st.executeQuery();
        Integer userId = -1;
        if (rs.next()) {
           DbUser newUser = new DbUser(rs.getString("login"),
                   rs.getString("password"),rs.getInt("id"));

           userId = rs.getInt("id");
           connector.closePreparedStatement(st);
           return  newUser;
        }
        else {
            throw new NullPointerException();
        }  
         
    }
    
    /**
     * Method which updates users unformation from database
     * @param user
     * @throws SQLException 
     */
    public void updateUser(DbUser user) throws SQLException {
        SLOG.info("updateUser dbuser dao");
        try {
            String query = "UPDATE dbuser SET password = ? where login = ?";
            PreparedStatement st = connector.getPreparedStatement(query);
            st.setString(1, user.getPassword());
            st.setString(2, user.getLogin());
            st.executeUpdate();
        } catch (Exception ex) {
            ERLOG.info("dbuser dao updateUser: " + ex);
        }
    }
   
}
