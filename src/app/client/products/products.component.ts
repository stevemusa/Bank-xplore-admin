import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',  // Updated selector
  templateUrl: './products.component.html',  // Updated template URL
  styleUrls: ['./products.component.css'],  // Updated stylesheet URL
  imports: [FormsModule], 
  standalone: true
})
export class ProductsComponent {
  productName = '';
  category = '';
  description = '';
  interestRate = 0;
  eligibility = '';

  // Loan Calculator fields
  maxLoanAmount = 0;
  loanInterestRate = 0;

  // Special Offers fields
  offerTitle = '';
  offerDescription = '';
  offerStartDate = '';
  offerEndDate = '';

  // Customer Reviews
  review = '';

  // FAQ
  faqQuestion = '';
  faqAnswer = '';

  addProduct() {
    const newProduct = {
      name: this.productName,
      category: this.category,
      description: this.description,
      interestRate: this.interestRate,
      eligibility: this.eligibility,
      loanCalculator: {
        maxAmount: this.maxLoanAmount,
        interestRate: this.loanInterestRate
      },
      specialOffer: {
        title: this.offerTitle,
        description: this.offerDescription,
        startDate: this.offerStartDate,
        endDate: this.offerEndDate
      },
      review: this.review,
      faq: {
        question: this.faqQuestion,
        answer: this.faqAnswer
      }
    };

    console.log('New Product Added:', newProduct);
    this.resetForm();
  }

  resetForm() {
    this.productName = '';
    this.category = '';
    this.description = '';
    this.interestRate = 0;
    this.eligibility = '';
    this.maxLoanAmount = 0;
    this.loanInterestRate = 0;
    this.offerTitle = '';
    this.offerDescription = '';
    this.offerStartDate = '';
    this.offerEndDate = '';
    this.review = '';
    this.faqQuestion = '';
    this.faqAnswer = '';
  }
}
