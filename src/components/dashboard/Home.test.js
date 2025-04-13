import { HttpResponse, http } from "msw";


http.post("/admin/list", ({ request, params, cookies }) => {


    const mockResponse = [
        {
            id: 1,
            name: "",
            email: "cicedac904@sentrau.com",
            contactNumber: "",
            role: "reader",
            libId: 14,
            Library: {
                id: 14,
                name: "Prometheus"
            },
            otp: ""
        },
        {
            id: 2,
            name: "",
            email: "gojo@satoru.com",
            contactNumber: "",
            role: "reader",
            libId: 14,
            Library: {
                id: 14,
                name: "Prometheus"
            },
            otp: ""
        },
        {
            id: 3,
            name: "",
            email: "geto@suguru.com",
            contactNumber: "",
            role: "reader",
            libId: 14,
            Library: {
                id: 14,
                name: "Prometheus"
            },
            otp: ""
        }
    ]

    return HttpResponse.json(mockResponse)
})