
const TestPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>
}) => {
    const slug = (await params).slug;
    // const questionsAndOptions: QuestionAndOptionsType[] | null = await getTestQuestions(slug);
    // const test = await getTestBySlug(slug);
    // if (!test) notFound();
    return (
        <div className='max-w-4xl mx-auto'>
            {slug}
            {/* <h1 className='text-3xl'>{test.title}</h1>
            <ScreeningTestPanel data={questionsAndOptions} test_id={test.id} /> */}
        </div>
    )
}

export default TestPage