/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.finalproject.profilesdao;

import com.finalproject.connector.DbConnector;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * ProfilesDao class - consists methods for accessing and processing profile
 * information
 * @author YuriiBel
 */
public class ProfilesDao {

    DbConnector connector = null;
    private static final org.apache.log4j.Logger SLOG
            = org.apache.log4j.Logger.getLogger("stdout");
    private static final org.apache.log4j.Logger ERLOG
            = org.apache.log4j.Logger.getLogger("error");
    
    public ProfilesDao() {
        this.connector = new DbConnector();
    }

    /**
     * Method which adds profile information of the user
     * @param newProfile
     * @throws SQLException 
     */
    public void addProfile(Profiles newProfile) throws SQLException {
        SLOG.info("addProfile profiles dao");
        String queryDBUser = "Insert Into profiles (userid, firstname,"
                + "lastname,adress,telephonenumber) values (?, ?, ?, ?, ?)";
        PreparedStatement st = connector.getPreparedStatement(queryDBUser);
        st.setInt(1, newProfile.getProfId());
        st.setString(2, newProfile.getFirstName());
        st.setString(3, newProfile.getLastName());
        st.setString(4, newProfile.getAdress());
        st.setString(5, newProfile.getTelephoneNumber());
        st.executeUpdate();

    }
    
    /**
     * Method which returns users profile by users id
     * @param id
     * @return Profiles entity
     * @throws SQLException 
     */
    public Profiles getProfileById(String id) throws SQLException {
        SLOG.info("getProfileById profiles dao");
        String query = "Select * from profiles where userid = ?";
        PreparedStatement st = connector.getPreparedStatement(query);
        st.setString(1, id);
        ResultSet rs = st.executeQuery();
        Profiles newProf = new Profiles();
        if (rs.next()) {
            newProf.setFirstName(rs.getString("firstName"));
            newProf.setLastName(rs.getString("lastName"));
            newProf.setAdress(rs.getString("adress"));
            Integer telephone = rs.getInt("telephoneNumber");
            newProf.setTelephoneNumber(telephone.toString());    
        }
        return newProf;
    }
    
    /**
     * Method which update users profile information
     * @param prof
     * @throws SQLException 
     */
    public void setProfile(Profiles prof) throws SQLException {
        SLOG.info("setProfile profiles dao");
        String query = "UPDATE profiles SET "
                     + "firstName = ?, lastName = ?, adress = ?,"
                + "telephoneNumber = ? where userid = ?";
        PreparedStatement st = connector.getPreparedStatement(query);
        st.setString(1, prof.getFirstName());
        st.setString(2, prof.getLastName());
        st.setString(3, prof.getAdress());
        st.setString(4, prof.getTelephoneNumber());
        st.setInt(5, prof.getProfId());
        st.executeUpdate();
    }
}
