import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dna } from 'react-loader-spinner';

import { buscar } from '../../../services/Service';
import { AuthContext } from '../../../contexts/AuthContext';


import CardTemas from '../cardCategoria/CardCategoria';

function ListaCategoria() {

    const [temas, setTemas] = useState<Categoria[]>([]);

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarCategoria() {
        try {
            await buscar('/categorias', setCategoria, {
                headers: { Authorization: token },
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/login');
        }
    }, [token])

    useEffect(() => {
        buscarCategoria()
    }, [temas.length])

    return (
        <>
            {temas.length === 0 && (
                <Dna
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {categoria.map((categoria) => (
                            <>
                                <CardCategoria key={categoria.id} tema={categoria} />
                            </>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaCategoria