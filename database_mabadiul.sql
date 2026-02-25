/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db_mabadiul_ihsan
-- ------------------------------------------------------
-- Server version	10.11.13-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Achievement`
--

DROP TABLE IF EXISTS `Achievement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Achievement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `level` varchar(191) NOT NULL,
  `student` varchar(191) NOT NULL,
  `date` varchar(191) NOT NULL,
  `rank` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `description` text DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Achievement`
--

LOCK TABLES `Achievement` WRITE;
/*!40000 ALTER TABLE `Achievement` DISABLE KEYS */;
INSERT INTO `Achievement` VALUES
(3,'Juara 1 Programming JAVA','Akademik','Nasional','Satria Yudha Pratama','Februari 2026',1,'2026-02-08 05:27:06.456','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','/uploads/achievement-1770528426453-FOTO-GALERI-1.jpg');
/*!40000 ALTER TABLE `Achievement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ContactMessage`
--

DROP TABLE IF EXISTS `ContactMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactMessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `subject` varchar(191) NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactMessage`
--

LOCK TABLES `ContactMessage` WRITE;
/*!40000 ALTER TABLE `ContactMessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `ContactMessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EducationGallery`
--

DROP TABLE IF EXISTS `EducationGallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `EducationGallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(191) NOT NULL,
  `caption` varchar(191) DEFAULT NULL,
  `unitId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EducationGallery_unitId_fkey` (`unitId`),
  CONSTRAINT `EducationGallery_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `EducationUnit` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EducationGallery`
--

LOCK TABLES `EducationGallery` WRITE;
/*!40000 ALTER TABLE `EducationGallery` DISABLE KEYS */;
INSERT INTO `EducationGallery` VALUES
(3,'/uploads/gallery-1770448112888-WhatsApp-Image-2025-12-08-at-18.54.13.jpeg',NULL,8),
(4,'/uploads/gallery-1770448112891-WhatsApp-Image-2025-12-08-at-18.54.14--2-.jpeg',NULL,8),
(5,'/uploads/gallery-1770448112895-WhatsApp-Image-2025-12-13-at-12.36.04.jpeg',NULL,8);
/*!40000 ALTER TABLE `EducationGallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EducationUnit`
--

DROP TABLE IF EXISTS `EducationUnit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `EducationUnit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `link` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `category` varchar(191) NOT NULL DEFAULT 'Pendidikan Formal',
  `accreditation` varchar(191) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `district` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `facebookUrl` varchar(191) DEFAULT NULL,
  `instagramUrl` varchar(191) DEFAULT NULL,
  `npsn` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `province` varchar(191) DEFAULT NULL,
  `regency` varchar(191) DEFAULT NULL,
  `status` varchar(191) DEFAULT NULL,
  `tiktokUrl` varchar(191) DEFAULT NULL,
  `twitterUrl` varchar(191) DEFAULT NULL,
  `village` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EducationUnit`
--

LOCK TABLES `EducationUnit` WRITE;
/*!40000 ALTER TABLE `EducationUnit` DISABLE KEYS */;
INSERT INTO `EducationUnit` VALUES
(8,'SMP PLUS CORDOVA','SMP Plus Cordova menjadi lembaga pendidikan islam modern lengkap dengan berbagai fasilitas yang mumpuni. Saat ini SMP Plus Cordova memiliki 22 rombel dengan jumlah 700an peserta didik yang keseluruhan diwajibkan mondok.','/uploads/thumb-1770478936394-smppsc.png','https://smppluscordova.sch.id','2026-02-07 07:08:32.886','Pendidikan Formal','A','JL. KH. Achmad Musayyidi','Tegalsari','smpplus.cordova@gmail.com','','https://www.instagram.com/smppluscordova/','69949765','08973266517','Jawa Timur','Banyuwangi','SWASTA','','','Karangdoro'),
(9,'SMA PLUS CORDOVA','SMA Plus Cordova menghadirkan pendidikan berkarakter dan berbasis asrama, membentuk santri yang disiplin, cerdas, dan berakhlak mulia.','/uploads/thumb-1770479838499-rifa--1-.png','','2026-02-07 15:54:55.851','Pendidikan Formal','B','','','','','','','','','','SWASTA','','','');
/*!40000 ALTER TABLE `EducationUnit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Facility`
--

DROP TABLE IF EXISTS `Facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Facility` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Facility`
--

LOCK TABLES `Facility` WRITE;
/*!40000 ALTER TABLE `Facility` DISABLE KEYS */;
INSERT INTO `Facility` VALUES
(1,'Podcast','Podcast adalah konten digital (audio atau video) berbentuk seri yang bisa diunduh atau didengarkan secara on-demand melalui internet, seperti program radio tapi dengan fleksibilitas waktu dan tempat yang lebih tinggi.','/uploads/facility-1770520178788-WhatsApp-Image-2025-12-13-at-12.36.04.jpeg','2026-02-08 03:09:38.794','2026-02-08 03:09:38.794');
/*!40000 ALTER TABLE `Facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrganizationMember`
--

DROP TABLE IF EXISTS `OrganizationMember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrganizationMember` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `position` varchar(191) NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrganizationMember`
--

LOCK TABLES `OrganizationMember` WRITE;
/*!40000 ALTER TABLE `OrganizationMember` DISABLE KEYS */;
INSERT INTO `OrganizationMember` VALUES
(1,'Abdullah Azwar Anas, S.Pd., S.S., M.Si.','Pembina Yayasan','/uploads/org-1770518465736-azwaranas.png',1,'2026-02-08 02:41:05.741','2026-02-08 02:41:05.741');
/*!40000 ALTER TABLE `OrganizationMember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PageMeta`
--

DROP TABLE IF EXISTS `PageMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `PageMeta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `PageMeta_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PageMeta`
--

LOCK TABLES `PageMeta` WRITE;
/*!40000 ALTER TABLE `PageMeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `PageMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Partner`
--

DROP TABLE IF EXISTS `Partner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Partner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `logo` varchar(191) NOT NULL,
  `website` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Partner`
--

LOCK TABLES `Partner` WRITE;
/*!40000 ALTER TABLE `Partner` DISABLE KEYS */;
INSERT INTO `Partner` VALUES
(1,'Bank Syariah Indonesia','/uploads/partner-1770391391702-Bank_Syariah_Indonesia.png','','2026-02-06 15:23:11.704','2026-02-06 15:50:39.674',1),
(2,'Quipper School','/uploads/partner-1770391478191-qsp-logo.png','','2026-02-06 15:24:38.193','2026-02-06 15:50:49.234',3),
(3,'Curriculum Cambridge','/uploads/partner-1770391660704-umlearning-(1).png','','2026-02-06 15:27:40.706','2026-02-06 15:50:44.586',2),
(6,'Silabor','/uploads/partner-1770444218563-silabor.png','https://silabor.my.id/','2026-02-07 06:03:38.565','2026-02-08 03:26:33.795',4);
/*!40000 ALTER TABLE `Partner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `category` varchar(191) NOT NULL DEFAULT 'Berita',
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `author` varchar(191) DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `eventDate` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Post_slug_key` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES
(10,'Berita COntoh','berita-contoh-1770524581252','<p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem&nbsp;Ipsum</strong><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">&nbsp;is&nbsp;simply&nbsp;dummy&nbsp;text&nbsp;of&nbsp;the&nbsp;printing&nbsp;and&nbsp;typesetting&nbsp;industry.&nbsp;Lorem&nbsp;Ipsum&nbsp;has&nbsp;been&nbsp;the&nbsp;industry&#39;s&nbsp;standard&nbsp;dummy&nbsp;text&nbsp;ever&nbsp;since&nbsp;the&nbsp;1500s,&nbsp;when&nbsp;an&nbsp;unknown&nbsp;printer&nbsp;took&nbsp;a&nbsp;galley&nbsp;of&nbsp;type&nbsp;and&nbsp;scrambled&nbsp;it&nbsp;to&nbsp;make&nbsp;a&nbsp;type&nbsp;specimen&nbsp;book.&nbsp;It&nbsp;has&nbsp;survived&nbsp;not&nbsp;only&nbsp;five&nbsp;centuries,&nbsp;but&nbsp;also&nbsp;the&nbsp;leap&nbsp;into&nbsp;electronic&nbsp;typesetting,&nbsp;remaining&nbsp;essentially&nbsp;unchanged.&nbsp;It&nbsp;was&nbsp;popularised&nbsp;in&nbsp;the&nbsp;1960s&nbsp;with&nbsp;the&nbsp;release&nbsp;of&nbsp;Letraset&nbsp;sheets&nbsp;containing&nbsp;Lorem&nbsp;Ipsum&nbsp;passages,&nbsp;and&nbsp;more&nbsp;recently&nbsp;with&nbsp;desktop&nbsp;publishing&nbsp;software&nbsp;like&nbsp;Aldus&nbsp;PageMaker&nbsp;including&nbsp;versions&nbsp;of&nbsp;Lorem&nbsp;Ipsum.</span></p><p><img src=\"/uploads/content/editor-1770524564164-mihagedung.jpg\"></p>','/uploads/news-1770524581247-WhatsApp-Image-2025-12-13-at-11.45.20-(1).jpeg','Berita',1,'2026-02-08 04:23:01.254','2026-02-08 04:23:01.254','Admin','berita','2026-02-03 00:00:00.000');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RegistrationStep`
--

DROP TABLE IF EXISTS `RegistrationStep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `RegistrationStep` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(191) NOT NULL,
  `order` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RegistrationStep`
--

LOCK TABLES `RegistrationStep` WRITE;
/*!40000 ALTER TABLE `RegistrationStep` DISABLE KEYS */;
INSERT INTO `RegistrationStep` VALUES
(1,'Isi Formulir Pendaftaran','Calon peserta didik mengisi formulir pendaftaran secara lengkap, baik melalui online (ppdb.ponpesmiha.online) maupun langsung ke sekretariat PPDB.','ClipboardList',1,'2026-02-06 14:57:18.882','2026-02-06 14:57:18.882'),
(2,'Verifikasi Berkas & Wawancara','Panitia PPDB melakukan pengecekan berkas administrasi dan melaksanakan wawancara untuk mengetahui minat, kemampuan, serta kesiapan calon siswa.','UserCheck',2,'2026-02-06 14:57:47.407','2026-02-06 14:57:47.407'),
(3,'Pengumuman & Daftar Ulang','Setelah dinyatakan diterima, calon peserta didik melakukan daftar ulang dan melengkapi administrasi untuk menjadi siswa resmi Yayasan.','Megaphone',3,'2026-02-06 14:58:19.998','2026-02-06 14:58:19.998'),
(4,'Selesai!','Segera minta admin sekretariat untuk memasukkan nomor Anda ke dalam Grup WhatsApp Wali Murid resmi agar tidak ketinggalan info jadwal masuk asrama/sekolah.','CheckCircle2',4,'2026-02-06 15:03:41.976','2026-02-07 10:09:20.395');
/*!40000 ALTER TABLE `RegistrationStep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SiteConfig`
--

DROP TABLE IF EXISTS `SiteConfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SiteConfig` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `heroTitle` text NOT NULL,
  `heroSubtitle` text NOT NULL,
  `videoUrl` varchar(191) DEFAULT NULL,
  `brosurUrl` varchar(191) DEFAULT NULL,
  `logoUrl` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `facebook` varchar(191) DEFAULT NULL,
  `instagram` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `registrationUrl` varchar(191) DEFAULT '/pendaftaran',
  `siteName` varchar(191) NOT NULL DEFAULT 'Mabadi''ul Ihsan',
  `youtube` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `greeting` text DEFAULT NULL,
  `history` text DEFAULT NULL,
  `mission` text DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `vision` text DEFAULT NULL,
  `profileImage` text DEFAULT NULL,
  `chairmanImage` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SiteConfig`
--

LOCK TABLES `SiteConfig` WRITE;
/*!40000 ALTER TABLE `SiteConfig` DISABLE KEYS */;
INSERT INTO `SiteConfig` VALUES
(1,'Yayasan Pondok Pesantren <br> Mabadi\'ul Ihsan & Daar Al Ihsan','Mabadi’ul Ihsan menghadirkan pengalaman belajar yang menyatukan kekuatan tradisi pesantren dan pendidikan modern. Di sini, setiap siswa dibina menjadi pribadi berkarakter, cerdas, dan siap bersaing.','','https://panitia.ponpesmiha.online/upload_junk/967afa0031831e3afd7edcbe55bd17da.jpg','/uploads/logo-1770552671349-logoyayasannmiha.png','JL. KH. Achmad Musayyidi Karangdoro, Kec. Tegalsari, Kab. Banyuwangi Prov. Jawa Timur','mabadiulihsan64@gmail.com','https://www.facebook.com/p/Mabadiul-Ihsan-100064602495859/','https://www.instagram.com/mabadiulihsan/','08973266517','https://ppdb.ponpesmiha.online/','Mabadi\'ul Ihsan Daar Al Ihsan','https://www.youtube.com/@pondokpesantrenmabadiulihs2639','2026-02-07 17:33:02.453','Assalamu’alaikum warahmatullahi wabarakatuh.\r\n\r\nSegala puji bagi Allah SWT. Yayasan Pondok Pesantren Mabadi’ul Ihsan terus berkomitmen menghadirkan pendidikan yang memadukan kekuatan ilmu, akhlak, dan tradisi pesantren. Melalui kurikulum terpadu serta pembinaan karakter yang berkesinambungan, kami berupaya mencetak generasi yang shalih, cerdas, dan siap berkontribusi bagi masyarakat.\r\n\r\nTerima kasih kepada seluruh pendidik, orang tua, dan mitra yang telah memberi dukungan dan kepercayaan. Semoga lembaga ini terus memberi manfaat dan menjadi wadah lahirnya generasi terbaik umat.\r\n\r\nWassalamu’alaikum warahmatullahi wabarakatuh.','Yayasan Pondok Pesantren Mabadi’ul Ihsan menghadirkan pendidikan terpadu yang menggabungkan kurikulum nasional dan kekhasan pesantren. Dengan penguatan Al-Qur’an, Bahasa Arab, kajian kitab, serta program tahfidz dan pembinaan karakter, kami berkomitmen membentuk generasi berakhlak mulia, berilmu, dan siap menghadapi tantangan zaman.','Menjadikan Al – Qur’an dan As – Sunnah dengan pemahaman salafus sholih sebagai landasan pendidikan\r\nMeningkatkan kegiatan – kegiatan keagamaan dan pelestarian lingkungan untuk membangun dan meningkatkan kualitas hidup negara\r\nMenumbuhkan semangat keunggulan dan profesionalisme dalam segala hal','2026-02-08 12:11:11.354','Mencetak sumber daya manusia yang cerdas, kreatif, berakhlaq mulia, inovatif, berperan aktif  dalam pelestarian lingkungan hidup dan sebagai kader bangsa dan agama.','/uploads/profile-1770461962138-WhatsApp-Image-2025-12-13-at-12.35.51.jpeg','/uploads/chairman-1770479892312-azwaranas.png');
/*!40000 ALTER TABLE `SiteConfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stat`
--

DROP TABLE IF EXISTS `Stat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Stat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(191) NOT NULL,
  `value` int(11) NOT NULL,
  `suffix` varchar(191) DEFAULT NULL,
  `icon` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stat`
--

LOCK TABLES `Stat` WRITE;
/*!40000 ALTER TABLE `Stat` DISABLE KEYS */;
INSERT INTO `Stat` VALUES
(1,'Peserta Didik',1001,'+','Users'),
(2,'Guru & Staff',115,'','UserCheck'),
(3,'Prestasi',195,'+','Trophy'),
(5,'Kemitraan',35,'','Users');
/*!40000 ALTER TABLE `Stat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Testimonial`
--

DROP TABLE IF EXISTS `Testimonial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Testimonial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `rating` int(11) NOT NULL DEFAULT 5,
  `isShow` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `image` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Testimonial`
--

LOCK TABLES `Testimonial` WRITE;
/*!40000 ALTER TABLE `Testimonial` DISABLE KEYS */;
INSERT INTO `Testimonial` VALUES
(4,'Satria Yudha Pratama, S.Kom.','Alumni 2019','Podcast adalah konten digital (audio atau video) berbentuk seri yang bisa diunduh atau didengarkan secara on-demand melalui internet, seperti program radio tapi dengan fleksibilitas waktu dan tempat yang lebih tinggi.',5,1,'2026-02-08 03:31:40.630','/uploads/testi-1770521500627-01.png');
/*!40000 ALTER TABLE `Testimonial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'admin',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES
(1,'admin','$2b$10$4GkqxUFkcHOJLYmaBxbPruswAh82TZTIGAXp5VkybXFtAsGREUrOm','Abimanyu','admin','2026-02-04 17:05:04.861'),
(2,'adminberita','$2b$10$NvadLt4gAApazwQaGXVh5.OED6ZwJ/J1LpawNtADHLtT1aW6YTcFC','Admin Berita','editor','2026-02-08 05:36:42.515');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES
('1c69f168-30ed-4f1c-8cf1-0265b31df52a','83aa67cb2c6c1fc59688c48c50f0ddcb06a5e79e17054c78fbf60d78296d8e25','2026-02-06 13:08:12.678','20260206130812_add_achievement_details',NULL,NULL,'2026-02-06 13:08:12.660',1),
('284ef22f-ea46-4132-a9d4-61839f08249c','9d564584b15f9f49e0de89ef220d9967296bfafcda97180ed8d471f3df997f9a','2026-02-08 02:58:27.070','20260208025827_add_facility',NULL,NULL,'2026-02-08 02:58:27.058',1),
('35c8e3a3-7880-490c-beb4-e8e6588d6a07','ce6dc3ac7e9dfadef15c26c2f031f9c37d9e8760ef56813c1afb5a7730f77c21','2026-02-04 17:00:53.021','20260204170052_add_all_cms_tables',NULL,NULL,'2026-02-04 17:00:52.939',1),
('3f9a4fe0-aac1-4a3c-a007-c3c4f9282c06','40de97b81a9fd1b1c9797c7eaed5cb8e240c1a91e14d37e1981b4d4600ced305','2026-02-06 14:21:35.621','20260206142135_add_registration_flow',NULL,NULL,'2026-02-06 14:21:35.610',1),
('4159e3c5-3c0c-4c47-9359-96527286aecd','774ecf0d0938ff599a9c84dae6f066f04498ca5c4073a8d8e78f5888696b2a6e','2026-02-06 13:28:34.652','20260206132834_add_testimonial_image',NULL,NULL,'2026-02-06 13:28:34.637',1),
('4781e81b-e9b4-45b9-90b3-443f225cdfc0','2f26f55e08e75ca5ddcafd99d2a5040ac4c81aba5c1c6d7e010636828390d4d0','2026-02-07 03:07:42.565','20260207030742_add_page_meta',NULL,NULL,'2026-02-07 03:07:42.551',1),
('633aa6fa-d782-4d0f-96d4-d69170db7a4c','0a016640e29b53a213d3e812f1899471e096a2fce8378ec35e8d0133dea9fec3','2026-02-04 19:00:59.278','20260204190059_add_education_unit',NULL,NULL,'2026-02-04 19:00:59.268',1),
('70aeb942-9601-4df2-9f9e-bd489fcea5bd','e931dad33e1ddc3417a832b8ea9212d8216f9dc73e5463d93297c632b6073a18','2026-02-04 21:25:53.059','20260204212553_add_unit_category',NULL,NULL,'2026-02-04 21:25:53.044',1),
('71c1939d-cc31-410c-8322-1f40b9200816','e51c1ed9d0e70e6fcd617349072cad7cd7bb5fbcb2535d1ee362c22f677c8234','2026-02-04 16:02:44.873','20260204160244_init_final_success',NULL,NULL,'2026-02-04 16:02:44.853',1),
('75d4ae93-b9e1-4226-be67-d219fed147db','d11a8874d9eb730ad81554f3f64b03a96a2e9106a0f7c4358f3dc14b1bf13b56','2026-02-07 11:07:44.401','20260207110744_add_chairman_image',NULL,NULL,'2026-02-07 11:07:44.384',1),
('780547a5-45fc-4ea5-8d24-ca73ffa44ad4','76c88162f6ef031ba690bd99e181aed35cf137f39fb498eeae1e12d38f5a09f7','2026-02-07 10:33:02.471','20260207103302_fix_site_config',NULL,NULL,'2026-02-07 10:33:02.451',1),
('79198773-381f-47d7-a2fc-85f3219ede7c','897d58b8e21824621e70544726019dc01800675790c660c0b669efb628f15303','2026-02-06 10:37:12.543','20260206103712_add_school_details',NULL,NULL,'2026-02-06 10:37:12.502',1),
('7ac5da0d-33a8-48a0-84a7-ac34e778664a','3536efdb5743fa2f143003ba45fac69b68b95ccc8a5ed395f7938357ebea38a3','2026-02-06 16:00:52.915','20260206160052_update_site_config',NULL,NULL,'2026-02-06 16:00:52.900',1),
('7d4e0873-6b67-433b-92e2-5d9ac25fc97e','5b2fe77decd1d2e74afe3df43af40f023ae24a7d5a530743bf4813f198ff728e','2026-02-04 17:59:13.005','20260204175912_add_created_at_to_testimonial',NULL,NULL,'2026-02-04 17:59:12.990',1),
('7efc3045-7992-46f4-9341-91f73479cbf7','897ca2f16d88a08e88f7a6814039676cb663dbf022110390ca9312fb4bdeeef4','2026-02-08 02:24:57.711','20260208022457_add_organization',NULL,NULL,'2026-02-08 02:24:57.699',1),
('7f2a661a-2b3f-4737-94a2-208bd4dca5ab','701e56bfe2a7aa7b49685939ed4ca47f035847a779773eb48023b84e0d5cf488','2026-02-07 10:41:39.973','20260207104139_add_profile_image',NULL,NULL,'2026-02-07 10:41:39.957',1),
('8bf4db83-7336-4ab2-be14-d9a6d8da17c6','7390784358a7535c11082e630a3b428192d5670e7462e051238f76f63d9f713a','2026-02-06 15:43:10.520','20260206154310_add_partner_order',NULL,NULL,'2026-02-06 15:43:10.504',1),
('b635dd9e-67da-44b2-ab26-4db8cccde660','4b94450216ee99df1880546ae0b85c567de5f8c786e49edb3037c08261ac2c63','2026-02-04 18:46:01.768','20260204184601_add_logo_url',NULL,NULL,'2026-02-04 18:46:01.751',1),
('bec10a8e-bbad-4571-a3ba-2adfa82caf55','6267c4b43fd4c27cfbb1c4130332f27d426909d34efff6c12ca09e6a79bfc585','2026-02-06 15:16:40.751','20260206151640_add_partners',NULL,NULL,'2026-02-06 15:16:40.739',1),
('c655c1c1-b401-4770-93f5-286ee56b3c91','a08605fdaa705592b92c674b5b8c651f6c7edeb8ba70741620cb1d880d4a7c64','2026-02-04 20:10:43.408','20260204201043_add_event_date',NULL,NULL,'2026-02-04 20:10:43.392',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-08 21:58:51
