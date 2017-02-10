
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.finalproject.orderdao;

import com.finalproject.connector.DbConnector;
import java.sql.PreparedStatement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * OrdersDao class - consists methods for accessing and processing order
 * information
 * @author YuriiBel
 */
public class OrdersDao {
    DbConnector connector = null;
    private static final org.apache.log4j.Logger SLOG
            = org.apache.log4j.Logger.getLogger("stdout");
    private static final org.apache.log4j.Logger ERLOG
            = org.apache.log4j.Logger.getLogger("error");
    public OrdersDao() {
        this.connector = new DbConnector();
    }
    
    /**
     * Method which add the list of user orders in the database
     * @param orderList
     * @return text status
     * @throws ClassNotFoundException 
     */
    public String addListOfOrders(List<Orders> orderList) throws ClassNotFoundException {
        SLOG.info("addListOfOrders orders dao");
        String dateFormatted = "";
        String result = "success";
        Orders o = orderList.get(0);
        try {
            for(Orders o1: orderList) {
                long jsdate = o1.getDate();
                Date date = new Date(jsdate);
                DateFormat formatter = new SimpleDateFormat("yy-MM-dd HH:mm:ss");
                dateFormatted = formatter.format(date);
                String query = "Insert Into orders (prodId, userid, date) " 
                                 + "values (?,?,?)";
                PreparedStatement st = connector.getPreparedStatement(query);
                st.setInt(0, o1.getProdId());
                st.setInt(1, o1.getUserId());
                st.setString(2, dateFormatted);
                st.executeUpdate(query);
            }             
        } catch(Exception e) {
                e.printStackTrace();
                ERLOG.info("orders dao: add orders list: " + e);
                result = e.getMessage();
        }
        return result;
    }
    
}
