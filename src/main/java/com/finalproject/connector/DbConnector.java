package com.finalproject.connector;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.MissingResourceException;
import java.util.Properties;


/**
 * DbConnector - class for service connection with database
 * @author YuriiBel
 */
public class DbConnector {
    private static final org.apache.log4j.Logger SLOG
            = org.apache.log4j.Logger.getLogger("stdout");
    private static final org.apache.log4j.Logger ERLOG
            = org.apache.log4j.Logger.getLogger("error");
    private Connection connection;

    public DbConnector() {
        try {
            Properties properties = new Properties();
            properties.setProperty("user", "root");
            properties.setProperty("password", "2004");
            properties.setProperty("useUnicode", "true");
            properties.setProperty("characterEncoding", "UTF-8");
            String url = "jdbc:mysql://localhost:3306/onlineshop";
            SLOG.info("DbConnector:get coonectio properies");
            try {
                Class.forName("com.mysql.jdbc.Driver");
                SLOG.info("DbConnector:try Class.forName ");
            } catch (ClassNotFoundException e) {
                System.out.println(e.getMessage());
                ERLOG.info("DbConnector:try Class.forNam: error: " + e);
            }
            connection = DriverManager.getConnection(url, properties);
        } catch (MissingResourceException e) {
            System.err.println("properties file is missing " + e);
            ERLOG.info("DbConnector: error: properties "
                                       + "file is missing" + e);
        } catch (SQLException e) {
            System.err.println("not obtained connection " + e);
            ERLOG.info("DbConnector:not obtained connection error: " + e);
        }
    }

    /**
     * getStatement - get a statement of connection
     */
    public Statement getStatement() throws SQLException {
        if (connection != null) {
            SLOG.info("DbConnector:getStatement connection != null");
            Statement statement = connection.createStatement();
            if (statement != null) {
                SLOG.info("DbConnector:getStatement; statement != null");
                return statement;
            }
        }
        throw new SQLException("connection or statement is null");
    }

    /**
     * getPreparedStatement - get a prepared statement of connection
     */
    public PreparedStatement getPreparedStatement(String sql)
            throws SQLException {
        if (connection != null) {
            SLOG.info("DbConnector:getPreparedStatement:"
                    + "connection != null");
            PreparedStatement statement = connection.prepareStatement(sql);
            if (statement != null) {
                SLOG.info("DbConnector:getPreparedStatement;"
                        + "statement != null");
                return statement;
            }
        }
        throw new SQLException("connection or statement is null");
    }

    /**
     * closeStatement - close statement connection
     */
    public void closeStatement(Statement statement) {
        if (statement != null) {
            try {
                SLOG.info("DbConnector:closeStatement;"
                        + "statement != null");
                statement.close();
            } catch (SQLException e) {
                System.err.println("statement is null " + e);
                ERLOG.info("DbConnector:closeStatement error;" + e);
            }
        }
    }

     /**
     * closePreparedStatement - close Prepared connection statement
     */
    
    public void closePreparedStatement(PreparedStatement statement) {
        if (statement != null) {
            try {
                SLOG.info("DbConnector:closePreparedStatement;"
                        + "statement != null");
                statement.close();
            } catch (SQLException e) {
                System.err.println("statement is null " + e);
                ERLOG.info("DbConnector:closePreparedStatement error;"+ e);
            }
        }
    }

    /**
     * closeConnection connection method
     */
    
    public void closeConnection() {
        if (connection != null) {
            try {
                SLOG.info("DbConnector:getPreparedStatement:"
                        + "connection != null");
                connection.close();
            } catch (SQLException e) {
                System.err.println(" wrong connection" + e);
                ERLOG.info("DbConnector:closeConnection error;" + e);
            }
        }
    }
}
