import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: string[] = [
    'assets/1.jpg',
    'assets/2.jpeg',
    'assets/3.png',
    'assets/4.png',
    // Add more image paths as needed
  ];

  
  cards = [
    {
      title: 'Shiba Inu',
      subtitle: 'Dog Breed',
      imageSrc: 'assets/4.png',
      content: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
    },
    {
      title: 'Labrador Retriever',
      subtitle: 'Dog Breed',
      imageSrc: 'assets/3.png',
      content: 'The Labrador Retriever is one of the most popular and versatile dog breeds. They are known for their friendly and outgoing nature, making them excellent companions and working dogs.'
    },
    {
      title: 'Labrador Retriever',
      subtitle: 'Dog Breed',
      imageSrc: 'assets/3.png',
      content: 'The Labrador Retriever is one of the most popular and versatile dog breeds. They are known for their friendly and outgoing nature, making them excellent companions and working dogs.'
    },
    {
      title: 'Labrador Retriever',
      subtitle: 'Dog Breed',
      imageSrc: 'assets/3.png',
      content: 'The Labrador Retriever is one of the most popular and versatile dog breeds. They are known for their friendly and outgoing nature, making them excellent companions and working dogs.'
    },
    {
      title: 'Labrador Retriever',
      subtitle: 'Dog Breed',
      imageSrc: 'assets/3.png',
      content: 'The Labrador Retriever is one of the most popular and versatile dog breeds. They are known for their friendly and outgoing nature, making them excellent companions and working dogs.'
    },
    {
      title: 'Labrador Retriever',
      subtitle: 'Dog Breed',
      imageSrc: 'assets/3.png',
      content: 'The Labrador Retriever is one of the most popular and versatile dog breeds. They are known for their friendly and outgoing nature, making them excellent companions and working dogs.'
    },
    // Add more card objects as needed
  ];
  currentIndex = 0;
  translateValue = '0px';
  autoRotateInterval: any;

  ngOnInit() {
    // Start auto-rotating the slider every 2 seconds
    this.autoRotateInterval = setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  ngOnDestroy() {
    // Clear the auto-rotate interval when the component is destroyed
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }

  nextSlide() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateSlider();
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
    this.updateSlider();
  }

  updateSlider() {
    this.translateValue = `-${this.currentIndex * 100}%`;
  }
}
