package com.finalproject.orderdao;

import java.io.Serializable;
import java.util.Objects;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Orders class - contains information about the user orders
 * @author YuriiBel
 */
@XmlRootElement
public class Orders implements Serializable {

    @XmlElement
    private Integer prodId;
    @XmlElement
    private long date;
    @XmlElement
    private Float cost;
    @XmlElement
    private Integer userId;

    public void setProdId(Integer prodId) {
        this.prodId = prodId;
    }

    public void setCost(Float cost) {
        this.cost = cost;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getProdId() {
        return prodId;
    }

    public Float getCost() {
        return cost;
    }

    public Integer getUserId() {
        return userId;
    }

    public Orders() {
    }

    public long getDate() {
        return date;
    }

    public void setDate(long date) {
        this.date = date;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 53 * hash + Objects.hashCode(this.prodId);
        hash = 53 * hash + (int) (this.date ^ (this.date >>> 32));
        hash = 53 * hash + Objects.hashCode(this.cost);
        hash = 53 * hash + Objects.hashCode(this.userId);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Orders other = (Orders) obj;
        if (this.date != other.date) {
            return false;
        }
        if (!Objects.equals(this.prodId, other.prodId)) {
            return false;
        }
        if (!Objects.equals(this.cost, other.cost)) {
            return false;
        }
        if (!Objects.equals(this.userId, other.userId)) {
            return false;
        }
        return true;
    }
    
    @Override
    public String toString() {
        return "Orders{" + "prodId=" + prodId + ", date=" + date + ", cost=" + cost + ", userId=" + userId + '}';
    }
       
}
