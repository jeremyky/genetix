// D3.js will be used here for visualization
let treeData = [];

async function loadFamilyMembers() {
    try {
        const response = await fetch('/api/family-members');
        const data = await response.json();
        treeData = data;
        updateTreeVisualization();
    } catch (error) {
        console.error('Error loading family members:', error);
    }
}

async function addFamilyMember(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const memberData = {
        name: formData.get('name'),
        birth_date: formData.get('birth_date'),
        gender: formData.get('gender')
    };

    try {
        const response = await fetch('/api/family-members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(memberData)
        });
        if (response.ok) {
            loadFamilyMembers();
            event.target.reset();
        }
    } catch (error) {
        console.error('Error adding family member:', error);
    }
}

function updateTreeVisualization() {
    // D3.js visualization code will go here
    // This will be implemented in the next step
}

document.addEventListener('DOMContentLoaded', () => {
    loadFamilyMembers();
    document.getElementById('addMemberForm').addEventListener('submit', addFamilyMember);
}); 