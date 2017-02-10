package com.finalproject.dao;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Good class - contains information about the good
 * @author YuriiBel
 */
@XmlRootElement
public class Good implements Serializable {
    @XmlElement
    private Integer prodId;
    @XmlElement
    private String title;
    @XmlElement
    private String bottomText;
    @XmlElement
    private float cost;
    @XmlElement
    private float hotCost;
    @XmlElement
    private String imageSrc;
    @XmlElement
    private String category;
    @XmlElement
    private String manufacturer;
    @XmlElement
    private int availability;

    public Good() {
    }

    public Good(Integer prodId) {
        this.prodId = prodId;
    }

    public Good(Integer prodId, String title, String bottomText, float cost,
            float hotCost, String imageSrc, String category,String manufacturer,
            int availability) {
        this.prodId = prodId;
        this.title = title;
        this.bottomText = bottomText;
        this.cost = cost;
        this.hotCost = hotCost;
        this.imageSrc = imageSrc;
        this.category = category;
    }

    public Integer getProdId() {
        return prodId;
    }

    public void setProdId(Integer prodId) {
        this.prodId = prodId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBottomText() {
        return bottomText;
    }

    public void setBottomText(String bottomText) {
        this.bottomText = bottomText;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    
    public void setHotCost(float hotCost) {
        this.hotCost = hotCost;
    }

    public float getHotCost() {
        return hotCost;
    }
    
    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public int getAvailability() {
        return availability;
    }

    public void setAvailability(int availability) {
        this.availability = availability;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (prodId != null ? prodId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Good)) {
            return false;
        }
        Good other = (Good) object;
        if ((this.prodId == null && other.prodId != null) || (this.prodId != null && !this.prodId.equals(other.prodId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.restexample.Dao.Goods[ prodId=" + prodId + " ]";
    }
    
}
