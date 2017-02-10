/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.finalproject.profilesdao;

import java.io.Serializable;

/**
 * Profiles class - contains information about the user profile
 * @author YuriiBel
 */
public class Profiles implements Serializable {

    private Integer profId;
    private String firstName;
    private String lastName;
    private String adress;
    private String telephoneNumber;

    public Profiles() {
    }

    public Profiles(Integer profId) {
        this.profId = profId;
    }

    public Profiles(Integer profId, String firstName, String lastName,
            String adress, String telephoneNumber) {
        this.profId = profId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.adress = adress;
        this.telephoneNumber = telephoneNumber;
    }

    public Integer getProfId() {
        return profId;
    }

    public void setProfId(Integer profId) {
        this.profId = profId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (profId != null ? profId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Profiles)) {
            return false;
        }
        Profiles other = (Profiles) object;
        if ((this.profId == null && other.profId != null)
                || (this.profId != null && !this.profId.equals(other.profId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.restexample.ProfilesDao.Profiles[ profId=" + profId + " ]";
    }

}
