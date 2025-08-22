'use client';

import './globals.css';
import LogoComp from "@/components/home/LogoComp"
import ContactComp from "@/components/home/ContactComp"
import CategoryComp from "@/components/home/CategoryComp"
import AfterEventComp from "@/components/home/AfterEventComp"
import AboutComp from "@/components/home/AboutComp"
import NewsletterComp from "@/components/home/NewsletterComp"
import SocialMediaComp from "@/components/home/SocialMediaComp"
import HeroComp from "@/components/home/HeroComp"
import NewsComp from '@/components/home/NewsComp'

export default function HomePage() {
    return(
        <>
        <br />
        <br />
        <br />
        <HeroComp></HeroComp>
        <AboutComp></AboutComp>
        <CategoryComp></CategoryComp>
        <AfterEventComp></AfterEventComp>
        <ContactComp></ContactComp>
        <SocialMediaComp></SocialMediaComp>
        <NewsletterComp></NewsletterComp>
        {/* <NewsComp></NewsComp> */}
        <LogoComp></LogoComp>  
        </>
    )
}
