function pdfExport() {
  var doc = new jsPDF();

  // Set margins
  const margins = {
    top: 20,
    bottom: 30,
    left: 10,
    right: 10,
  };
  const pageHeight = doc.internal.pageSize.height;

  // Heading
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.text(
    "University Student Enrollment Agreement",
    105,
    margins.top,
    null,
    null,
    "center"
  );

  // Retrieve values from form fields
  var universityName = document.getElementById("universityName").value,
    studentName = document.getElementById("studentName").value,
    studentID = document.getElementById("studentID").value,
    programName = document.getElementById("programName").value,
    degreeName = document.getElementById("degreeName").value,
    startYear = document.getElementById("startYear").value,
    endYear = document.getElementById("endYear").value,
    stateOrCountry = document.getElementById("stateOrCountry").value;

  if (
    universityName === "" ||
    studentName === "" ||
    studentID === "" ||
    programName === "" ||
    degreeName === "" ||
    startYear === "" ||
    endYear === "" ||
    stateOrCountry === ""
  ) {
    alert("The PDF could not be created. Please complete all fields.");
  } else {
    var y = margins.top + 20;

    // University and Student Info
    doc.setFontSize(12);
    doc.text(`University Name: ${universityName}`, margins.left, y);
    y += 10;
    doc.text(`Student Name: ${studentName}`, margins.left, y);
    y += 10;
    doc.text(`Student ID: ${studentID}`, margins.left, y);
    y += 10;
    doc.text(`Program of Study: ${programName}`, margins.left, y);
    y += 10;
    doc.text(`Term: ${startYear} to ${endYear}`, margins.left, y);
    y += 20;

    // Sections with dynamic text handling
    doc.setFont("times", "bold");
    doc.text("I. Enrollment and Program", margins.left, y);
    doc.setFont("times", "normal");
    y += 10;

    y = addTextWithWrap(
      doc,
      "1. Admission: The student is admitted to " +
        universityName +
        " as a candidate for the " +
        degreeName +
        " degree. Admission is contingent upon the student's continued compliance with university policies and academic standards.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );
    y = addTextWithWrap(
      doc,
      "2. Program Requirements: The student agrees to complete all course requirements, participate in necessary activities, and meet the standards set forth by their program.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );
    y = addTextWithWrap(
      doc,
      "3. Academic Performance: The student must maintain a minimum GPA as specified by their program to remain in good academic standing.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );
    y += 10;
    y = checkPageAdd(doc, y, pageHeight, margins);

    // Financial Terms
    doc.setFont("times", "bold");
    doc.text("II. Financial Terms", margins.left, y);
    doc.setFont("times", "normal");
    y += 10;
    y = addTextWithWrap(
      doc,
      "1. Tuition and Fees: The student agrees to pay all applicable tuition and fees for their program by the deadlines published by the university.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );
    y = addTextWithWrap(
      doc,
      "2. Refunds and Withdrawals: Details regarding tuition refunds and the process for withdrawal from the university are as described in the university’s official refund and withdrawal policies.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );

    y += 10;
    y = checkPageAdd(doc, y, pageHeight, margins);

    // University Policies
    doc.setFont("times", "bold");
    doc.text("III. University Policies", margins.left, y);
    doc.setFont("times", "normal");
    y += 10;
    y = addTextWithWrap(
      doc,
      "1. Code of Conduct: The student agrees to abide by the university's code of conduct, including regulations regarding academic integrity, behavior on campus, and use of university facilities.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );
    y = addTextWithWrap(
      doc,
      "2. Privacy and Personal Information: The university respects student privacy and commits to handling personal information in accordance with applicable privacy laws.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );
    y = addTextWithWrap(
      doc,
      "3. Non-Discrimination Policy: The university adheres to a strict non-discrimination policy in all programs and activities. This policy covers discrimination on the basis of race, color, gender, national origin, age, religion, creed, disability, veteran’s status, sexual orientation, gender identity, or gender expression.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );
    y = addTextWithWrap(
      doc,
      "4. Use of Campus Facilities and Resources: Students are granted access to campus facilities including libraries, sports facilities, and study areas according to guidelines that ensure fair and safe use for all members of the university community. The university reserves the right to revoke access to these facilities if a student fails to comply with the applicable policies.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );

    y += 10;
    y = checkPageAdd(doc, y, pageHeight, margins);

    // Miscellaneous
    doc.setFont("times", "bold");
    doc.text("IV. Miscellaneous", margins.left, y);
    doc.setFont("times", "normal");
    y += 10;
    y = addTextWithWrap(
      doc,
      "1. Amendments: This agreement may only be amended through a written agreement duly signed by both the university and the student. Any such amendments must be formally documented and approved by the relevant university authority.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );
    y = addTextWithWrap(
      doc,
      "2. Governing Law: This agreement shall be governed by the laws of " +
        stateOrCountry +
        ", without giving effect to any principles of conflicts of law.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );
    y = addTextWithWrap(
      doc,
      "3. Notices: Any notices or communication under this agreement must be in writing and either personally delivered, sent by certified mail, return receipt requested, or email (with confirmation of receipt), addressed to the appropriate party at the address specified at the beginning of this agreement or at such other address as either party may later specify by written notice.",
      y,
      doc.internal.pageSize.width - margins.left - margins.right
    );

    y += 10;
    y = checkPageAdd(doc, y, pageHeight, margins);

    // Signatures
    doc.setFont("times", "bold");
    doc.text("Signatures", margins.left, y);
    doc.setFont("times", "normal");
    y += 10;
    doc.text(
      "Student's Signature: ___________________________________",
      10,
      y + 10
    );
    doc.text("Date: __________________", 150, y + 10);
    y += 20;
    doc.text(
      "University Representative's Signature: ____________________",
      10,
      y + 10
    );
    doc.text("Date: __________________", 150, y + 10);

    doc.save("enrollment-agreement.pdf");
  }
}

function addTextWithWrap(doc, text, initialY, maxWidth) {
  const lineHeight = 5;
  var splitText = doc.splitTextToSize(text, maxWidth);
  splitText.forEach(function (line, index) {
    doc.text(line, 10, initialY + lineHeight * index);
  });
  return initialY + lineHeight * splitText.length + 2;
}

function checkPageAdd(doc, currentY, pageHeight, margins) {
  if (currentY + margins.bottom > pageHeight - margins.bottom) {
    doc.addPage();
    return margins.top; // Reset Y position to top margin of the new page
  }
  return currentY;
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btnExp").addEventListener("click", pdfExport);
});
