INSERT INTO companies (id, created_at, name, sector, size, linkedin_url, website, phone_number, address, zipcode, city, state_abbr, sales_id, country, description, revenue, tax_identifier, logo) VALUES
(1, '2026-03-19T17:43:55.598+00:00', 'Pi Beta Phi', NULL, NULL, NULL, 'https://uark.pibetaphi.org/', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '{"src": "https://favicon.show/uark.pibetaphi.org", "title": "Company favicon"}'),
(2, '2026-03-19T17:57:13.316+00:00', 'University of Arkansas', NULL, 500, NULL, 'https://www.uark.edu/', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '{"src": "https://favicon.show/uark.edu", "title": "Company favicon"}'),
(3, '2026-03-19T17:59:06.697+00:00', 'Onyx Coffee Company', NULL, NULL, NULL, 'https://onyxcoffeelab.com/', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '{"src": "https://favicon.show/onyxcoffeelab.com", "title": "Company favicon"}'),
(4, '2026-03-19T18:22:34.361+00:00', 'Bass Pro Shop', NULL, NULL, NULL, 'https://www.basspro.com/', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '{"src": "https://favicon.show/basspro.com", "title": "Company favicon"}'),
(5, '2026-03-19T18:22:51.063+00:00', 'Cheers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(6, '2026-03-19T18:23:02.897+00:00', 'Tyson Foods', NULL, NULL, NULL, 'https://www.tysonfoods.com/', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '{"src": "https://favicon.show/tysonfoods.com", "title": "Company favicon"}'),
(7, '2026-03-19T18:26:20.734+00:00', 'Newftec', NULL, NULL, NULL, 'https://newftec.com/', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '{"src": "https://favicon.show/newftec.com", "title": "Company favicon"}'),
(8, '2026-03-19T19:10:08.274+00:00', 'Northwest Arkansas Visitor Center', NULL, NULL, NULL, 'https://northwestarkansas.org/', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '{"src": "https://favicon.show/northwestarkansas.org", "title": "Company favicon"}'),
(9, '2026-03-19T19:10:55.062+00:00', 'Fayetteville Craft Brewery', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(10, '2026-03-19T19:12:03.192+00:00', 'Razorback Alumni Chapter - Dallas', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL),
(11, '2026-03-19T19:14:40.831+00:00', 'Tupps Brewery', NULL, NULL, NULL, 'https://tuppsbrewery.com/', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '{"src": "https://favicon.show/tuppsbrewery.com", "title": "Company favicon"}'),
(12, '2026-03-24T21:17:50.672+00:00', 'Pi Phi Baylor', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL)
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name, 
  website = EXCLUDED.website, 
  logo = EXCLUDED.logo, 
  size = EXCLUDED.size;
