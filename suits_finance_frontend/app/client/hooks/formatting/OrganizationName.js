const formatOrganization = (
    organization
) => {
// handle organization names with underscores

if (!organization || typeof organization !== 'string') {
    return '';
}

if (!organization.includes('_')) {
    return organization.charAt(0).toUpperCase() + organization.slice(1);
}

return organization
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default formatOrganization;


const formatToOrganizationUnderscored = (
    organization
) => {
    if (!organization || typeof organization !== 'string') {
        return '';
    }
    return organization.toLowerCase().replace(/ /g, '_');
};

export { formatToOrganizationUnderscored };