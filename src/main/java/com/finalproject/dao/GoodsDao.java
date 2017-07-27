/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.finalproject.dao;

import com.finalproject.connector.DbConnector;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import com.server.ActionService;
import com.server.Answer;
import com.server.WebInterface;

/**
 * GoodDao class - consists methods for accessing and processing goods
 * information
 * @author YuriiBel
 */
public class GoodsDao {

    DbConnector connector = null;
    private static final org.apache.log4j.Logger SLOG
            = org.apache.log4j.Logger.getLogger("stdout");
    private static final org.apache.log4j.Logger ERLOG
            = org.apache.log4j.Logger.getLogger("error");
    
    public GoodsDao() {
        this.connector = new DbConnector();
    }

    /**
     * Method for getting goods from database
     *
     * @return goods for selling
     * @throws ClassNotFoundException
     */
    public List<Good> getAllGoods() throws ClassNotFoundException {
        SLOG.info("getAllGoods goods dao");
        List<Good> goodsList = new ArrayList<Good>();
        ActionService service = new ActionService();
        WebInterface server = service.getActionPort();

        try {
            String query = "Select goods.*, goodcategory.name,"
                    + "if(isnull(specialgoods.hotCost),0,specialgoods.hotCost) "
                    + "AS hotCost from goods left join specialgoods on "
                    + "goods.prodId = specialgoods.prodId inner join "
                    + "goodcategory on goods.categoryId = goodcategory.categId";
            Statement st = connector.getStatement();
            ResultSet rs = st.executeQuery(query);

            while (rs.next()) {
                Good newGood = new Good();
                newGood.setProdId(rs.getInt("prodId"));
                newGood.setTitle(rs.getString("title"));
                newGood.setBottomText(rs.getString("bottomText"));

                Answer s = server.getCosts(newGood.getProdId().toString());
                newGood.setCost(s.getCost());
                newGood.setHotCost(s.getHotcost());

                newGood.setImageSrc(rs.getString("imageSrc"));
                newGood.setCategory(rs.getString("name"));
                newGood.setManufacturer(rs.getString("manufacturer"));
                newGood.setAvailability(rs.getInt("availability"));
                goodsList.add(newGood);
            }
        } catch (Exception e) {
            ERLOG.info("goods dao: get all goods: " + e);
            e.printStackTrace();
        }
        return goodsList;
    }

    /**
     * Method for declude availability of the good
     *
     * @param good
     * @return text status
     * @throws ClassNotFoundException
     */
    public String addGood(Good recGood) throws ClassNotFoundException {
        SLOG.info("addGood goods dao");
        String result = "good added successfully";
        try {
            String query = "Update goods set availability = availability-1 "
                    + "where prodId = ?";
            PreparedStatement st = connector.getPreparedStatement(query);
            st.setInt(0, recGood.getProdId());
            st.executeUpdate(query);
        } catch (Exception e) {
            e.printStackTrace();
            ERLOG.info("goods dao: geadd Good: " + e);
            result = "error while adding good";
        }
        return result;
    }

    /**
     * Method for including availability of the good
     *
     * @param id of the good
     * @return text status
     * @throws ClassNotFoundException
     */
    public String deleteGoodById(String id) throws ClassNotFoundException {
        SLOG.info("deleteGoodById goods dao");
        String result = "good added successfully";
        try {
            String query = "Update goods set availability = availability+1 "
                    + "where prodId = ?";
            PreparedStatement st = connector.getPreparedStatement(query);
            st.setString(0, id);
            st.executeUpdate(query);
        } catch (Exception e) {
            e.printStackTrace();
            ERLOG.info("goods dao: deleteGoodById: " + e);
            result = "error while adding good";
        }
        return result;
    }
}
