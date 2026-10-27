import { describe, expect, it } from "vitest";
import { contactMessage, enquiryLink, quoteMessage } from "@/lib/enquiry";

describe("enquiries", () => {
  it("quotation message carries product, application, quantity and contact", () => {
    const m = quoteMessage({ name: "Ada", phone: "0801", product: "Champagne Gold", application: "Kitchen", quantity: "25", unit: "square metres", location: "Abuja", installation: "Yes" });
    expect(m).toContain("Product: Champagne Gold");
    expect(m).toContain("Application: Kitchen");
    expect(m).toContain("Estimated Quantity: 25 square metres");
    expect(m).toContain("Customer Name: Ada");
    expect(m).toContain("Phone Number: 0801");
  });
  it("contact message reflects product and application", () => {
    expect(contactMessage("Zaria Red", "House Floor")).toContain("Zaria Red granite for my house floor");
  });
  it("uses WhatsApp when a number is set, email otherwise", () => {
    expect(enquiryLink("hi", "s", "+234 800").href).toBe("https://wa.me/234800?text=hi");
    expect(enquiryLink("hi", "s", "").channel).toBe("email");
  });
});
