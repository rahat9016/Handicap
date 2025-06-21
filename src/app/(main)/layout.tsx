

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-background text-primary content-center">
            <div>{children}</div>
        </section>
    );
}