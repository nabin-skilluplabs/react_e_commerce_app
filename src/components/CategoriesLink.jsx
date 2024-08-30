function CategoriesLink(props) {
    return (
        {
            props.linkText && (
                <a href={props.linkUrl} className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                {props.linkText}
                <span aria-hidden="true"> &rarr;</span>
                </a>
            )
        }
    )
}

export default CategoriesLink;