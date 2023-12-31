DROP TABLE organizer, concert, ticket, category;

-- Organizer table
CREATE TABLE organizer (
  organizerid INT NOT NULL AUTO_INCREMENT,
  organizerName VARCHAR(255) NOT NULL,
  organizerEmail VARCHAR(255) NOT NULL,
  accAddress VARCHAR(255) NOT NULL,
  documentUrl VARCHAR(255) NOT NULL,
  IsVerified BOOLEAN NOT NULL,
  isArchived BOOLEAN NOT NULL,
  PRIMARY KEY (organizerid)
);

-- Concert table
CREATE TABLE concert (
  concertid INT NOT NULL AUTO_INCREMENT,
  organizerid INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  owner VARCHAR(255) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  createdDate DATETIME NOT NULL,
  conductedDate DATETIME NOT NULL,
  numZone INT NOT NULL,
  zoneinfo VARCHAR(255) NOT NULL,
  totalSeat INT NOT NULL,
  imgurl VARCHAR(255) NOT NULL,
  PRIMARY KEY (concertid)
);

-- Ticket table
CREATE TABLE ticket (
  ticketid INT NOT NULL AUTO_INCREMENT,
  concertid INT NOT NULL,
  customerid VARCHAR(50) NOT NULL,
  receipt VARCHAR(255) NOT NULL,
  zone VARCHAR(255) NOT NULL,
  purchaseDate DATETIME NOT NULL,
  used BOOLEAN NOT NULL,
  PRIMARY KEY (ticketid)
);

-- Category table
CREATE TABLE category (
  categoryid INT NOT NULL AUTO_INCREMENT,
  categoryname VARCHAR(50) NOT NULL,
  PRIMARY KEY (categoryid)
);

INSERT INTO category (categoryname) VALUES
  ('All'),
  ('Pop'),
  ('Rock'),
  ('Hip Hop'),
  ('Country'),
  ('Jazz'),
  ('Electronic'),
  ('Classical'),
  ('R&B'),
  ('Reggae'),
  ('Indie');
