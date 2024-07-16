import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  assetsBaseUrl = environment.assetsBaseUrl;
  appFeatures = [
    {
      title: "Visa Interview checklist",
      description: `Not sure what to take on your Biometric (OFC/VAC) or Visa Interview day? <br>
                    Explore our Interview Checklist feature.
                    `,
      href: "/f1-visa-interview-checklist",
      hrefName: "Check",
      imgSrc: this.assetsBaseUrl + "/images/checklist.avif",
      imgAlt: "F-1 Visa interview checklist",
      isAvailable: true
    },
    {
      title: "Know Embassy & Consulates",
      description: `Good to know more about the embassy or consulate location before your visit.`,
      href: "/embassy-consulates",
      hrefName: "Know more",
      imgSrc: this.assetsBaseUrl + "/images/embassy-building.jpg",
      imgAlt: "Consulate Embassy building",
      isAvailable: true
    },
    {
      title: "Find Travel partner for Interview",
      description: `Are you getting bored with solo traveling or don't want to bring family members to the interview location...!`,
      href: "/find-my-partner/interview-travel",
      hrefName: "Find a travel partner",
      imgSrc: this.assetsBaseUrl + "/images/travel-partner.webp",
      imgAlt: "Two people traveling",
      isAvailable: true
    },
    {
      title: "Find the best hotels nearby Embassy",
      description: `Find a hotel near to embassy and stay together with friends to minimize your expenses.`,
      href: null,
      hrefName: "Coming soon...",
      imgSrc: this.assetsBaseUrl + "/images/hotel-partner.jpg",
      imgAlt: "Two people waiting in front of hotel",
      isAvailable: false
    },
    {
      title: "Find a partner for mock interview.",
      description: `Practice together and achieve together. Get it review your answers before your interview.`,
      href: null,
      hrefName: "Coming soon...",
      imgSrc: this.assetsBaseUrl + "/images/qa-two-people.jpg",
      imgAlt: "Two people discussion",
      isAvailable: false
    },
    {
      title: "Have something on your mind?",
      description: `If you have a brainstorming idea in your mind, share the thoughts with us we build it for all our student community.`,
      href: "mailto:help@educationinusa@gmail.com",
      hrefName: "I have a new idea 💡",
      imgSrc: this.assetsBaseUrl + "/images/think-bulb.avif",
      imgAlt: "Person thinking",
      isAvailable: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  performAction(enableAction: boolean | undefined, actionName: string | undefined): void {
    if (enableAction && actionName) {

    }
  }

}
