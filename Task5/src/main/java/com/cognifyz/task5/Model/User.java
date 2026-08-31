package com.cognifyz.task5.Model;

public class User {
    private Long id;
    private int age;
    private String name;
    private String email;
    private String gender;
    private String city;

    public User() {
    }

    public User(Long id, int age, String name, String email, String gender, String city) {
        this.id = id;
        this.age = age;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.city = city;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
