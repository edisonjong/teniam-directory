export default function FAQs() {
  return (
    <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
          <div className="text-center lg:text-left">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
              Frequently <br className="hidden lg:block" /> Asked{" "}
              <br className="hidden lg:block" />
              Questions
            </h2>
            <p>Accusantium quisquam. Illo, omnis?</p>
          </div>

          <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
            <div className="pb-6">
              <h3 className="font-medium">How do I submit a tool?</h3>
              <p className="text-muted-foreground mt-4">
                {" "}
                Click “Submit a Tool” and complete the quick submission form.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-medium">What types of tools are accepted?</h3>
              <p className="text-muted-foreground mt-4">
                We welcome developer tools, frameworks, platforms, and services
                that empower tech projects.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-medium">Is there a cost to list a tool?</h3>
              <p className="text-muted-foreground my-4">
                Listings are free, with optional paid featured placements. Check
                our pricing guide for details.
              </p>
            </div>
            <div className="py-6">
              <h3 className="font-medium">
                Can I update my listing after submission?
              </h3>
              <p className="text-muted-foreground mt-4">
                Yes, you can edit your listing anytime via your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
