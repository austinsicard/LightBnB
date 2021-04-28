INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO users (name, email, password)
VALUES ('Jones Jonas', 'jonesjonas@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Hartley Day', 'hartleyday@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Jimmy Jimbo', 'jimmyjimbo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, 
cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'House 10k sqrft', 'description', 'thumbnail_url', 'cover_photo_url', 1250, 8, 8, 5,
 'Canada', '33 Rose Lane', 'Ottawa', 'ON', 'K1H8J7', TRUE),
(2, 'House 10k sqrft', 'description', 'thumbnail_url', 'cover_photo_url', 1250, 8, 6, 10,
 'Canada', '67 Random Steet', 'Quebec City', 'QC', 'K2H7J0', TRUE),
(3, 'RV Custom', 'description', 'thumbnail_url', 'cover_photo_url', 900, 4, 2, 5,
 'Canada', '21 RV lane', 'Ottawa', 'ON', 'K2F5F5', FALSE);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 7, 8, 'message'),
(2, 2, 5, 9, 'message'),
(3, 3, 3, 4, 'message');